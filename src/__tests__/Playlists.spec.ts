import { getPlaylistVideos } from "../youtube/api";
import TreePageObject from "../testUtils/TreePageObject";
import Mock = jest.Mock;

jest.mock("../youtube/api", () => ({
  getPlaylistVideos: jest.fn()
}));

describe("having a single playlist node", () => {
  const page = new TreePageObject(["MyPlaylistNodeId"]);
  it("when opening that node it should load playlist videos", () => {
    (getPlaylistVideos as Mock).mockReturnValueOnce(Promise.resolve());

    page.clickOnArrow('MyPlaylistNodeId');
    expect(getPlaylistVideos).toHaveBeenCalledWith("MyPlaylistId");
  });
});
