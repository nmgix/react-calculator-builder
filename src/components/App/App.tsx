import Container from "components/Container";
import Canvas from "components/Widgets/Calculator/Canvas";
import React from "react";
import { Provider } from "react-redux";
import store from "redux/store";
import { CanvasExistingComponent } from "types/Canvas/Canvas.components";

const sidebarComponents: CanvasExistingComponent[] = [
  {
    component: "display",
    indestructible: true,
  },
  {
    component: "operationButtons",
    indestructible: true,
  },
  {
    component: "digitalBlock",
    indestructible: true,
  },
  {
    component: "equalizationButton",
    indestructible: true,
  },
  {
    component: "storage",
    indestructible: true,
  },
];

const canvasComponents: CanvasExistingComponent[] = [
  {
    component: "storage",
    indestructible: true,
  },
  {
    component: "runtimeSwitch",
    indestructible: true,
  },
  // {
  //   component: "display",
  // },
  // {
  //   component: "operationButtons",
  // },
  // {
  //   component: "digitalBlock",
  // },
  // {
  //   component: "equalizationButton",
  // },
];

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className='bg-neutral-200 h-screen w-screen flex justify-center items-center'>
        <Container externalClassnames='w-[695px] h-[640px] flex justify-between py-10 px-20 pb-[86px]'>
          <Container externalClassnames='pt-[68px]'>
            <Canvas noRuntime existingComponents={sidebarComponents} />
          </Container>
          <Container>
            <Canvas existingComponents={canvasComponents} />
          </Container>
        </Container>
      </div>
    </Provider>
  );
};
