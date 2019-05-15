import * as React from "react";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  getByTestId
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

  constructor(favoriteNodes?: string[]) {
    beforeEach(() => {
      this.app = render(<App favoriteNodes={favoriteNodes} />);
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

  getNode(nodeId: string, zone?: Zone) {
    return this.getElementInZone("node-" + nodeId, zone);
  }

  getInputForNode(nodeId: string) {
    return this.app.getByTestId("input-" + nodeId);
  }

  getDragHandle(nodeId: string, zone?: Zone) {
    return this.getElementInZone("drag-handle-" + nodeId, zone);
  }

  getAllNodes() {
    return this.app.getAllByTestId(node => node.startsWith("node-"));
  }

  clickOnImage(nodeId: string) {
    fireEvent.click(this.app.getByTestId("video-image-" + nodeId));
  }

  openSearch() {
    fireEvent.click(this.app.getByTestId("toggle-sidebar"));
  }

  getPlayer() {
    return this.app.getByTestId("player");
  }

  //Drag'n'Drop scenarious
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

  setDragSpecificCoordinates() {
    getClientOffset.mockImplementation(() => ({ x: 0, y: 0 }));
    getBoundingClientRect.mockImplementation(() => ({
      x: 0,
      bottom: 0,
      top: 10
    }));
  }

  startDraggingNode(nodeId: string, zone?: Zone) {
    fireEvent.dragStart(this.getDragHandle(nodeId, zone));
  }

  dragOverNode(nodeId: string, zone?: Zone) {
    fireEvent.dragOver(this.getDragHandle(nodeId, zone));
  }

  dropOverNode(nodeId: string, zone?: Zone) {
    fireEvent.drop(this.getDragHandle(nodeId, zone));
  }

  cancelDrag(nodeId: string, zone?: Zone) {
    fireEvent.dragEnd(this.getDragHandle(nodeId, zone));
  }

  //GENERIC HELPERS

  getElementInZone(elemId: string, zone: Zone = "favorites") {
    const zoneElement = this.app.getByTestId(zone + "-zone");
    return getByTestId(zoneElement, elemId);
  }
}

type Zone = "search" | "favorites";
