import * as React from "react";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult
} from "react-testing-library";
import "jest-styled-components";
import App from "../App";

const {
  getClientOffset,
  getBoundingClientRect
} = require("../tree/offsetHandler");

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

  describe('when dragging a Node 2 above the middle of Node 1 and too far in x shift', () => {
    beforeEach(() => {
      rendered = createDragScenario("drag-handle-2", "node-1", { x: 100, y: 5 });
    });

    it('boundary should be still with zero shift', () => {
      expect(rendered.getByTestId("border-1")).toHaveStyleRule(
        "left",
        '15px'
      );
    });
  });

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
      it('two nodes should be on the same level', () => {
        expect(rendered.getByTestId("node-1")).toHaveStyleRule("padding-left", "0px");
        expect(rendered.getByTestId("node-2")).toHaveStyleRule("padding-left", "0px");
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
      yOffset: number,
      leftPosition: string
    ) => {
      const clientOffset = { x: xOffset, y: yOffset };
      rendered = createDragScenario("drag-handle-2", "node-1", clientOffset);
      expect(rendered.getByTestId("border-1")).toHaveStyleRule(
        "left",
        leftPosition
      );
    };

    it("34 left position should be 0px", () =>
      simulateAnOffsetScenario(34, 6, "15px"));

    it("35 left position should be 35px", () =>
      simulateAnOffsetScenario(35, 6, "35px"));

    it("54 left position should be 35px", () =>
      simulateAnOffsetScenario(54, 6, "35px"));

    it("55 left position should be 35px (restricted because Node 1 is level 0)", () =>
      simulateAnOffsetScenario(55, 6, "35px"));

    it("when dragging above of the middle restrictions should be less 1", () =>
      simulateAnOffsetScenario(54, 2, "15px"));
  });

  describe('dragging 2 over the top of 1.2 with far right shift', () => {
    it('should create a 1-level boundary shift (because previous element is on the same level)', () => {
      const rendered = createDragScenario('drag-handle-2', 'node-1.2', {x: 100, y: 5});
      expect(rendered.getByTestId("border-1.2")).toHaveStyleRule(
        "left",
        '55px'
      );
    });
  });
});
