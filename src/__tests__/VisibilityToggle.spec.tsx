import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "react-testing-library";
import * as React from "react";
import "jest-styled-components";
import App from "../App";

describe("Having a simple Tree", () => {
  let rendered: RenderResult;
  afterEach(cleanup);

  beforeEach(() => {
    rendered = render(<App />);
  });

  const getNodes = () =>
    rendered.getAllByTestId(node => node.startsWith("node-"));

  const getFirstArrow = () => rendered.getAllByTestId("arrow")[0].children[0];

  it("should render two nodes", () => {
    expect(getNodes()).toHaveLength(2);
  });

  it("should render right arrow", () => {
    expect(getFirstArrow()).toHaveStyleRule("border-width", "6.9px 4px 0 4px");
  });

  describe("when clicking on an arrow", () => {
    beforeEach(() => {
      fireEvent.click(getFirstArrow());
    });

    it("there should be only 1 node (one child hidden)", () => {
      expect(getNodes()).toHaveLength(1);
    });

    it("arrow should point to the right", () => {
      expect(getFirstArrow()).toHaveStyleRule(
        "border-width",
        "4px 0 4px 6.9px"
      );
    });
  });
});
