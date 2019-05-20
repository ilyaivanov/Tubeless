import React from "react";
import {cleanup, fireEvent, render, RenderResult} from "react-testing-library";
import TestTree, {TestNodeId} from "./TestTree";
import {clickOnArrow} from "./domManipulationUtils";

class TreePageObject {
  // @ts-ignore
  app: RenderResult;

  constructor(testNodes: TestNodeId[]) {
    beforeEach(() => this.render(testNodes));
    afterEach(cleanup);
  }

  render = (testNodes: TestNodeId[]) =>
    (this.app = render(<TestTree ids={testNodes}/>));

  getNode = (nodeId: TestNodeId) => this.app.getByTestId("node-" + nodeId);

  getNodeTitle = (nodeId: string): string =>
    this.app.getByTestId("title-" + nodeId).innerHTML;

  queryNode = (nodeId: TestNodeId) => this.app.queryByTestId("node-" + nodeId);

  clickRemoveButton = (nodeId: TestNodeId) =>
    fireEvent.click(this.app.getByTestId("delete-" + nodeId));

  clickEditButton = (nodeId: string) =>
    fireEvent.click(this.app.getByTestId("edit-" + nodeId));

  enterTextIntoInput(nodeId: string, newText: string) {
    fireEvent.change(this.getInput(nodeId), {
      target: {value: newText}
    });
  }

  clickOnArrow = (nodeId:string) =>
    clickOnArrow(this.app, nodeId);

  getLoading = (nodeId: string) =>
    this.app.getByTestId('loading-' + nodeId);

  queryLoading = (nodeId: string) =>
    this.app.queryByTestId('loading-' + nodeId);

  getInput = (nodeId: string) => this.app.getByTestId("input-" + nodeId);

  stopEditingTextViaBlur(nodeId: string) {
    fireEvent.blur(this.app.getByTestId("input-" + nodeId));
  }

  simulateEnterKeypress(nodeId: string) {
    fireEvent.keyPress(this.getInput(nodeId), {
      key: "Enter",
      code: 13,
      charCode: 13
    });
  }

  clickAddNewVideo() {
    fireEvent.click(this.app.getByTestId("add-new-node"));
  }

  getAllNodes() {
    return this.app.getAllByTestId(node => node.startsWith("node-"));
  }
}

export default TreePageObject;
