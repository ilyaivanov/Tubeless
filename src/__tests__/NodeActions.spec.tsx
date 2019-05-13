import * as React from "react";
import AppPage from "./AppPage";

jest.mock("../tree/sampleTrees", () => ({
  sampleNodes: jest.requireActual("../tree/sampleTrees").mediumSizedTree
}));

describe("Having a tree with nodes ", () => {
  const app = new AppPage();
  afterEach(app.cleanup);

  it("when clicking remove Node 2 that node should be removed", () => {
    app.expectNodeToExist('2');
    app.clickRemoveButton('2');
    app.expectNodeNotToExist('2');
  });
});



