//search1
// search1.sub

//favorited1
// favorited1.sub

import AppPageObject from "../testUtils/AppPageObject";

//Fake backend response

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

  it("", () => {
    page.openSearch();

    page.setDragSpecificCoordinates();

    page.startDraggingNode("1.1", "search");
    page.dragOverNode("1", "search");
    page.dragOverNode("2", "favorites");

    expect(page.getBorder("2")).toBeDefined();
    expect(page.queryBorder("1")).toBeNull();
  });
});
