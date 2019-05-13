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

  clickArrow(nodeId:string){
    fireEvent.click(this.getArrowForNode(nodeId));
  }

  expectNodeToExist(nodeId: string) {
    expect(this.app.getByTestId("node-" + nodeId)).toBeDefined();
  }

  expectNodeNotToExist(nodeId: string) {
    expect(this.app.queryByTestId("node-" + nodeId)).toBeNull();
  }

  getArrowForNode(nodeId:string){
    return this.app.getByTestId("arrow-"+nodeId);
  }

  getAllNodes(){
    return this.app.getAllByTestId(node => node.startsWith("node-"));
  }

  cleanup = () => {
    cleanup();
    this.app = render(<App />);
  };
}
