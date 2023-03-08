import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Canvas, CanvasComponentsSelector, CanvasState } from "types/Canvas";

const initialState: CanvasState = {
  canvases: [],
};

const CanvasReducer = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    addNewCanvas: (state, action: PayloadAction<Canvas>) => {
      return { ...state, canvases: [...state.canvases, action.payload] };
    },
    removeCanvas: (state, action: PayloadAction<{ id: string }>) => {
      return { ...state, canvases: state.canvases.filter((canvas) => canvas.id !== action.payload.id) };
    },
    addComponent: (
      state,
      action: PayloadAction<{ canvasId: string; component: CanvasComponentsSelector.CanvasComponents }>
    ) => {
      const updatedCanvas = state.canvases.map((canvas) =>
        canvas.id === action.payload.canvasId
          ? { ...canvas, components: [...canvas.components, action.payload.component] }
          : canvas
      );
      return { ...state, canvases: updatedCanvas };
    },
    removeComponent: (state, action: PayloadAction<{ canvasId: string; componentId: string }>) => {
      const updatedCanvas = state.canvases.map((canvas) =>
        canvas.id === action.payload.canvasId
          ? {
              ...canvas,
              components: canvas.components.filter((component) => component.id !== action.payload.componentId),
            }
          : canvas
      );
      return { ...state, canvases: updatedCanvas };
    },
    // switchRuntime: (state, action: PayloadAction<{ canvasId: string }>) => {
    //   const updatedCanvas = state.canvases.map((canvas) =>
    //     canvas.id === action.payload.canvasId ? { ...canvas, runtime: !canvas.runtime } : canvas
    //   );
    //   return { ...state, canvases: updatedCanvas };
    // },
    changeComponentData: (
      state,
      action: PayloadAction<{
        canvasId: string;
        componentId: string;
        newComponentData: CanvasComponentsSelector.CanvasComponents;
      }>
    ) => {
      const updatedCanvas = state.canvases.map((canvas) =>
        canvas.id === action.payload.canvasId
          ? {
              ...canvas,
              components: canvas.components.map((component) =>
                component.id === action.payload.componentId ? action.payload.newComponentData : component
              ),
            }
          : canvas
      );
      return { ...state, canvases: updatedCanvas };
    },
  },
});

export const canvasActions = CanvasReducer.actions;
export default CanvasReducer.reducer;