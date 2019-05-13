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

type Point = { x: number; y: number };

export default class AppPage {
  // @ts-ignore
  app: RenderResult;

  constructor() {
    beforeEach(() => {
      this.app = render(<App />);
    });
    afterEach(cleanup);
  }

  clickRemoveButton(nodeId: string) {
    fireEvent.click(this.app.getByTestId("delete-" + nodeId));
  }

  clickEditButton(nodeId: string) {
    fireEvent.click(this.app.getByTestId("edit-" + nodeId));
  }

  enterTextIntoInput(nodeId: string, newText: string) {
    fireEvent.change(this.app.getByTestId("input-" + nodeId), {
      target: { value: newText }
    });
  }

  stopEditingTextViaBlur(nodeId: string) {
    fireEvent.blur(this.getInputForNode(nodeId));
  }

  clickArrow(nodeId: string) {
    fireEvent.click(this.getArrowForNode(nodeId));
  }

  getArrowForNode(nodeId: string) {
    return this.app.getByTestId("arrow-" + nodeId);
  }

  getNodeTitle(nodeId: string): string {
    return this.app.getByTestId("title-" + nodeId).innerHTML;
  }

  clickAddNewVideo() {
    fireEvent.click(this.app.getByTestId("add-new-node"));
  }

  expectNodeToExist(nodeId: string) {
    expect(this.getNode(nodeId)).toBeDefined();
  }

  expectNodeNotToExist(nodeId: string) {
    expect(this.app.queryByTestId("node-" + nodeId)).toBeNull();
  }

  simulateEnterKeypress(nodeId: string) {
    fireEvent.keyPress(this.getInputForNode(nodeId), {
      key: "Enter",
      code: 13,
      charCode: 13
    });
  }

  dragNodeOverOtherNode(
    nodeBeingDraggedId: string,
    nodeOverWhichToDragId: string,
    dragCoordiates: Point,
    boundingRect?: Partial<DOMRect>
  ) {
    getClientOffset.mockImplementation(() => dragCoordiates);
    getBoundingClientRect.mockImplementation(
      () => boundingRect || { x: 0, bottom: 0, top: 10 }
    );

    fireEvent.dragStart(this.getDragHandle(nodeBeingDraggedId));

    fireEvent.dragOver(this.getNode(nodeOverWhichToDragId));
  }

  endDragAtNode(nodeId: string) {
    fireEvent.dragEnd(this.getNode(nodeId));
  }

  dropAtNode(nodeId: string) {
    fireEvent.drop(this.getNode(nodeId));
  }

  getBorder(nodeId: string) {
    return this.app.getByTestId("border-" + nodeId);
  }
  queryBorder(nodeId: string) {
    return this.app.queryByTestId("border-" + nodeId);
  }

  getNode(nodeId: string) {
    return this.app.getByTestId("node-" + nodeId);
  }

  getInputForNode(nodeId: string) {
    return this.app.getByTestId("input-" + nodeId);
  }

  getDragHandle(nodeId: string) {
    return this.app.getByTestId("drag-handle-" + nodeId);
  }

  getAllNodes() {
    return this.app.getAllByTestId(node => node.startsWith("node-"));
  }

  clickOnImage(nodeId: string) {
    fireEvent.click(this.app.getByTestId("video-image-" + nodeId));
  }

  getPlayer() {
    return this.app.getByTestId("player");
  }
}
