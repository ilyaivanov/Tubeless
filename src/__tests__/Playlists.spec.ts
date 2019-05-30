import { getPlaylistVideos } from "../youtube/api";
import TreePageObject from "../testUtils/TreePageObject";

jest.mock("../youtube/api", () => ({
  getPlaylistVideos: jest.fn().mockReturnValueOnce(Promise.resolve())
}));

describe("having a single playlist node", () => {
  const page = new TreePageObject(["MyPlaylistNodeId"]);
  it("when opening that node it should load playlist videos", () => {
    page.clickOnArrow('MyPlaylistNodeId');
    expect(getPlaylistVideos).toHaveBeenCalledWith("MyPlaylistId", undefined);
  });
});
