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

  expectNodeToExist(nodeId: string) {
    expect(this.app.getByTestId("node-" + nodeId)).toBeDefined();
  }

  expectNodeNotToExist(nodeId: string) {
    expect(this.app.queryByTestId("node-" + nodeId)).toBeNull();
  }

  cleanup() {
    cleanup();
    this.app = render(<App />);
  }
}
