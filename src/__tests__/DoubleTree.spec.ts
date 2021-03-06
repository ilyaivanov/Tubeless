import AppPageObject from "../testUtils/AppPageObject";

describe("Having two trees: search results and favorites", () => {
  const page = new AppPageObject({
    searchFirstNodes: ["1"],
    favoriteFirstNodes: ["2"]
  });

  beforeEach(() => {
    page.openSearch();

    page.setDragSpecificCoordinates();

    page.startDraggingNode("1.1", "search");
    page.dragOverNode("1", "search");
    page.dragOverNode("2", "favorites");
  });

  it("should render only one border (remove border from search)", () => {
    expect(page.getBorder("2")).toBeDefined();
    expect(page.queryBorder("1")).toBeNull();
  });

  describe("when dropping an item then", () => {
    beforeEach(() => {
      page.dropAtNode("2", "favorites");
    });

    it("should copy that item and assign new id", () => {
      Math.random = () => 33333;
      //TODO: check that element has been created in favorites before 2
      //mock ID generation
    });
  });
});
