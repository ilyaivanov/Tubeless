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

describe("should render without errors", () => {
  let rendered: RenderResult;
  afterEach(cleanup);

  beforeEach(() => {
    rendered = render(
      <DragContext>
        <Tree />
      </DragContext>
    );
  });

  it("rendering a tree and then dragging Node 2 around", async () => {
    const res = rendered.getByTestId("drag-handle-2");
    fireEvent.dragStart(res);

    const second = rendered.getByTestId("node-1");
    fireEvent.dragOver(second);

    const border = rendered.getByTestId("border-1");
    expect(border).toHaveStyleRule("bottom", "-1px");
  });
});
