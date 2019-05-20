import TreePageObject from "../testUtils/TreePageObject";
import { YoutubeVideoResponse } from "../youtube/api";

jest.mock("../youtube/api", () => ({
  searchSimilar: () =>
    new Promise<YoutubeVideoResponse>(resolve => {
      setTimeout(() => {
        resolve({
          videos: [
            {
              title: "My Similar Video1",
              previewUrl: "url",
              videoId: "similar 1"
            },
            {
              title: "My Similar Video2",
              previewUrl: "url",
              videoId: "similar 2"
            },
            {
              title: "My Similar Video3",
              previewUrl: "url",
              videoId: "similar 3"
            }
          ]
        });
      }, 200);
    })
}));

jest.useFakeTimers();

describe("Having a tree with nodes ", () => {
  const app = new TreePageObject(["2"]);

  it("when clicking remove Node 2 that node should be removed", () => {
    expect(app.getNode("2")).toBeDefined();
    app.clickRemoveButton("2");
    expect(app.queryNode("2")).toBeNull();
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
    expect(app.getAllNodes()).toHaveLength(1);
    app.clickAddNewVideo();
    expect(app.getAllNodes()).toHaveLength(2);
  });

  describe("when opening a video node", () => {
    beforeEach(() => app.clickOnArrow("2"));

    it("a loading indicator should be shown", () => {
      expect(app.getLoading("2")).toBeDefined();
    });

    describe("after similar videos have been loaded", () => {
      beforeEach(() => {
        jest.runAllTimers();
      });
      it("they should be shown as a subnodes", () => {
        expect(app.getAllNodes()).toHaveLength(4);
      });
      it("Loading show be hidden", () => {
        expect(app.queryLoading("2")).toBeNull();
      });
    });
  });
});
