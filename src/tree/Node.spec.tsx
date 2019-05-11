import {cleanup, fireEvent, render, RenderResult, waitForElement} from "react-testing-library";
import * as React from "react";
import Tree from "./Tree";
import "jest-styled-components";
import {DragContext} from "./dnd";

describe("Having a simple Tree", () => {
  let rendered: RenderResult;
  afterEach(cleanup);

  beforeEach(() => {
    rendered = render(<DragContext><Tree/></DragContext>);
  });

  const getNodes = async () =>
    await waitForElement(() => rendered.getAllByTestId(node => node.startsWith("node-")));

  const getFirstArrow = async () =>
    await waitForElement(() => rendered.getAllByTestId("arrow")[0].children[0]);

  it("should render two nodes", async () => {
    expect(await getNodes()).toHaveLength(2);
  }, 200);

  it("should render right arrow", async () => {
    expect(await getFirstArrow()).toHaveStyleRule(
      "border-width",
      "6.9px 4px 0 4px"
    );
  });

  describe("when clicking on an arrow", () => {
    beforeEach(async () => {
      fireEvent.click(await getFirstArrow());
    });

    it("there should be only 1 node (one child hidden)", async () => {
      expect(await getNodes()).toHaveLength(1);
    }, 200);

    it("arrow should point to the right", async () => {
      expect(await getFirstArrow()).toHaveStyleRule(
        "border-width",
        "4px 0 4px 6.9px"
      );
    });
  });
});
