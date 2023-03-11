import { useCallback, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { useAction, useAppSelector } from "redux/helpers";
import { Canvas, CanvasState } from "types/Canvas";
import { CanvasComponent } from "types/Canvas/Canvas.components";
import { useRuntime } from "./useRuntime";

export const useCanvas = (state: CanvasState, canvasId: string) => {
  const [canvas, setCanvas] = useState<Canvas | undefined>(undefined);
  useEffect(() => {
    if (state.canvases) {
      setCanvas(state.canvases.find((canvas) => canvas.id === canvasId));
    }
  }, [state.canvases, canvasId]);

  return canvas;
};

export const useCanvasWidget = (
  canvasId: string,
  componentId: string,
  componentRef: React.RefObject<HTMLDivElement>,
  indestructible: boolean,
  draggable: boolean,
  index: number
) => {
  const { removeComponent } = useAction();
  const state = useAppSelector((state) => state.canvas);
  const canvas = useCanvas(state, canvasId);
  const runtime = useRuntime(canvas);

  // состояние компонента
  const [componentState, setComponentState] = useState<CanvasComponent | null>(null);
  useEffect(() => {
    if (!canvas) return;
    const currentComponent = canvas.components.find((c) => c.id === componentId);
    if (!currentComponent) return;
    setComponentState(currentComponent);
  }, [canvas, componentId]);

  // удаление по двойному нажатию
  const onClickHandler = useCallback(
    (event: MouseEvent) => {
      if (indestructible || runtime) return;
      if (event.detail === 2) {
        removeComponent({ canvasId, componentId });
      }
    },
    [canvasId, componentId, indestructible, removeComponent, runtime]
  );
  useEffect(() => {
    let node = componentRef.current;
    if (node) componentRef.current?.addEventListener("click", onClickHandler);
    return () => {
      node?.removeEventListener("click", onClickHandler);
    };
  }, [componentRef, onClickHandler]);

  // useEffect(() => {
  // если в другом канвасе есть такой тип, то стать полупрозрачным
  // либо при dnd будет этот элемент удаляться из текущего канваса и создаваться в другом (мб как existingComponent),
  // в таком случае на старом месте пока элемент тащится, текущий остается на месте, а при сбросе на другое полотно на старом месте будет создаваться копия но уже полупрозрачная
  // }, [state.canvases]);

  const [{ isDragging }, drag] = useDrag({
    item: { uuid: componentState?.id, type: "canvasWidget" },
    type: componentState?.type ?? "",
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
    canDrag: () => {
      return componentState?.draggable ?? draggable;
    },
  });

  return {
    componentState,
    state,
    canvas,
    runtime,
    dnd: {
      isDragging,
      drag,
    },
  };
};
