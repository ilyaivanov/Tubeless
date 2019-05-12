import * as React from "react";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult
} from "react-testing-library";
import "jest-styled-components";
import App from "../App";

const { getClientOffset, getBoundingClientRect } = require("../tree/offsetHandler");

jest.mock("../tree/offsetHandler", () => ({
  getClientOffset: jest.fn(),
  getBoundingClientRect: jest.fn()
}));

const createDragScenario = (
  elementBeingDragged: string,
  hoverElement: string,
  clientOffset: { x: number; y: number }
) => {
  getClientOffset.mockImplementation(() => clientOffset);
  getBoundingClientRect.mockImplementation(() => ({ bottom: 0, top: 10 }));
  const rendered = render(<App />);
  const res = rendered.getByTestId(elementBeingDragged);
  fireEvent.dragStart(res);

  const second = rendered.getByTestId(hoverElement);
  fireEvent.dragOver(second);
  return rendered;
};

describe("Having a tree with two nodes Node 2 being child of Node 1", () => {
  let rendered: RenderResult;
  afterEach(cleanup);

  describe("when dragging a Node 2 above the middle Node 1", () => {
    beforeEach(() => {
      rendered = createDragScenario("drag-handle-2", "node-1", { x: 0, y: 5 });
    });

    it("boundary above the target should be shown", async () => {
      expect(rendered.getByTestId("border-1")).toHaveStyleRule("top", "-1px");
    });

    describe("after ending the drag", () => {
      beforeEach(() => {
        fireEvent.dragEnd(rendered.getByTestId("node-1"));
      });
      it("boundary should disappear", () => {
        expect(rendered.queryByTestId("border-1")).toBeNull();
      });
    });

    describe("after dropping the drag", () => {
      beforeEach(() => {
        fireEvent.drop(rendered.getByTestId("node-1"));
      });
      it("boundary should disappear", () => {
        expect(rendered.queryByTestId("border-1")).toBeNull();
      });
    });
  });

  describe("when dragging a Node 2 below the middle Node 1", () => {
    beforeEach(() => {
      rendered = createDragScenario("drag-handle-2", "node-1", { x: 0, y: 6 });
    });
    it("boundary below the target should be shown", async () => {
      expect(rendered.getByTestId("border-1")).toHaveStyleRule(
        "bottom",
        "-1px"
      );
    });
  });

  describe("checking boundary left position for having a client offset of", () => {
    const simulateAnOffsetScenario = (
      xOffset: number,
      leftPosition: string
    ) => {
      const clientOffset = { x: xOffset, y: 6 };
      rendered = createDragScenario("drag-handle-2", "node-1", clientOffset);
      expect(rendered.getByTestId("border-1")).toHaveStyleRule(
        "left",
        leftPosition
      );
    };

    it("34 left position should be 0px", () =>
      simulateAnOffsetScenario(34, "15px"));

    it("35 left position should be 20", () =>
      simulateAnOffsetScenario(35, "35px"));

    it("54 left position should be 20", () =>
      simulateAnOffsetScenario(54, "35px"));

    it("55 left position should be 40", () =>
      simulateAnOffsetScenario(55, "55px"));
  });
});
