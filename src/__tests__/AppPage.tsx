import * as React from "react";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult
} from "react-testing-library";
import "jest-styled-components";
import App from "../App";

export default class AppPage {
  app: RenderResult;

  constructor() {
    this.app = render(<App />);
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
    fireEvent.blur(this.app.getByTestId("input-" + nodeId));
  }

  clickArrow(nodeId: string) {
    fireEvent.click(this.getArrowForNode(nodeId));
  }

  getArrowForNode(nodeId: string) {
    return this.app.getByTestId("arrow-" + nodeId);
  }

  getAllNodes() {
    return this.app.getAllByTestId(node => node.startsWith("node-"));
  }

  getNodeTitle(nodeId: string): string {
    return this.app.getByTestId("title-" + nodeId).innerHTML;
  }

  clickAddNewVideo() {
    fireEvent.click(this.app.getByTestId("add-new-node"));
  }

  expectNodeToExist(nodeId: string) {
    expect(this.app.getByTestId("node-" + nodeId)).toBeDefined();
  }

  expectNodeNotToExist(nodeId: string) {
    expect(this.app.queryByTestId("node-" + nodeId)).toBeNull();
  }

  simulateEnterKeypress(nodeId: string) {
    fireEvent.keyPress(this.app.getByTestId("input-" + nodeId), {
      key: "Enter",
      code: 13,
      charCode: 13
    });
  }

  cleanup = () => {
    cleanup();
    this.app = render(<App />);
  };
}
