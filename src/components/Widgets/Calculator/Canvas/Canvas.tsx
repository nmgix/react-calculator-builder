import React from "react";
import { CanvasComponentsSelector, CanvasExistingComponent } from "types/Canvas";
import CalculatorBlock from "../CalculatorBlock";
import RuntimeSwitch from "../RuntimeSwitch";
import { useCanvas } from "./useCanvas";

type CanvasProps = {
  noRuntime?: true;
  existingComponents?: CanvasExistingComponent[];
};

export const Canvas: React.FC<CanvasProps> = ({ noRuntime, existingComponents }) => {
  const { canvasState } = useCanvas(existingComponents);
  return (
    <div>
      <CalculatorBlock componentId={"0"} canvasId={canvasState.id} indestructible={true} />
      {!noRuntime && <RuntimeSwitch canvasId={canvasState.id} componentId={"1"} indestructible={true} />}
      {canvasState.components.map((component) => {
        const neededClass = CanvasComponentsSelector.getSuitableClass(component.type);
        console.log(neededClass);

        return React.createElement((neededClass as CanvasComponentsSelector.CanvasComponents).component, {
          canvasId: canvasState.id,
          componentId: component.id,
          indestructible: component.indestructible,
          key: component.id,
        });
      })}
    </div>
  );
};