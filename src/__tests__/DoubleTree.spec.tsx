import AppPageObject from "../testUtils/AppPageObject";

describe("Having two trees: search results and favorites", () => {
  const page = new AppPageObject();

  it("", () => {
    page.openSearch();
    //type something in search
    //verify mocked backend is called
    //verify nodes are shown at search
    // expect(page.)
  });
});

describe("Having two trees: search results and favorites", () => {
  const page = new AppPageObject();

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
      //TODO: check that element has been created in favorites before 2
      //mock ID generation
    });
  });
});
