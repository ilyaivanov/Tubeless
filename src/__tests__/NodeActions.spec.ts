import AppPage from "../testUtils/AppPageObject";

describe("Having a tree with nodes ", () => {
  const app = new AppPage({favoriteFirstNodes: ['2']});

  it("when clicking remove Node 2 that node should be removed", () => {
    app.expectNodeToExist("2");
    app.clickRemoveButton("2");
    app.expectNodeNotToExist("2");
  });

  describe("when clicking edit node 2", () => {
    it("entering a new text and moving away from input (losing focus) should update text", () => {
      expect(app.getNodeTitle("2")).toEqual("Node 2");
      app.clickEditButton("2");
      app.enterTextIntoInput("2", "New Text");
      app.stopEditingTextViaBlur("2");
      expect(app.getNodeTitle("2")).toEqual("New Text");
    });

    it("when clicking enter it should also stop editing", () => {
      expect(app.getNodeTitle("2")).toEqual("Node 2");
      app.clickEditButton("2");
      app.enterTextIntoInput("2", "New Text");
      app.simulateEnterKeypress("2");
      expect(app.getNodeTitle("2")).toEqual("New Text");
    });
  });

  it("when clicking add video a new video should be added", () => {
    app.clickAddNewVideo();
    expect(app.getNodeByText('New Node')).toBeDefined();
    expect(app.getAllNodes()).toHaveLength(4);
  });
});
