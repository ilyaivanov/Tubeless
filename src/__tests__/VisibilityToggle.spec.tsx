import * as React from "react";
import "jest-styled-components";
import AppPage from "./AppPage";

jest.mock("../tree/sampleTrees", () => ({
  sampleNodes: jest.requireActual("../tree/sampleTrees").twoNestedNodes
}));

describe("Having a simple Tree", () => {
  const app = new AppPage();
  afterEach(app.cleanup);

  it("should render two nodes", () => {
    expect(app.getAllNodes()).toHaveLength(2);
  });

  it("should render right arrow", () => {
    expect(app.getArrowForNode("1")).toHaveStyleRule(
      "border-width",
      "6.9px 4px 0 4px"
    );
  });

  describe("when clicking on an arrow", () => {
    beforeEach(() => app.clickArrow("1"));

    it("there should be only 1 node (one child hidden)", () => {
      expect(app.getAllNodes()).toHaveLength(1);
    });

    it("arrow should point to the right", () => {
      expect(app.getArrowForNode("1")).toHaveStyleRule(
        "border-width",
        "4px 0 4px 6.9px"
      );
    });
  });
});