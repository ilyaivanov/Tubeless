import * as React from "react";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult
} from "react-testing-library";
import Tree from "./Tree";
import "jest-styled-components";
import { DragContext } from "./dnd";

const { getClientOffset, getBoundingClientRect } = require("./offsetHandler");

jest.mock("./offsetHandler", () => ({
  getClientOffset: jest.fn(),
  getBoundingClientRect: jest.fn()
}));

const createDragScenario = (
  elementBeingDragged: string,
  hoverElement: string,
  yPosition: number
) => {
  getClientOffset.mockImplementation(() => ({ x: 0, y: yPosition }));
  getBoundingClientRect.mockImplementation(() => ({ bottom: 0, top: 10 }));
  const rendered = render(
    <DragContext>
      <Tree />
    </DragContext>
  );
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
      rendered = createDragScenario("drag-handle-2", "node-1", 5);
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
      rendered = createDragScenario("drag-handle-2", "node-1", 6);
    });
    it("boundary below the target should be shown", async () => {
      const border = rendered.getByTestId("border-1");
      expect(border).toHaveStyleRule("bottom", "-1px");
    });
  });
});
