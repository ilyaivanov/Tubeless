import AppPageObject from "../testUtils/AppPageObject";
import { searchVideos, YoutubeVideoResponse } from "../youtube/api";
import { createId } from "../domain/nodes.utils";

jest.mock("../youtube/api", () => ({
  searchVideos: jest.fn()
}));

fit("when entering some search term it should display search results", async() => {
  const page = new AppPageObject();
  jest.useFakeTimers();

  const now = jest.fn();
  now.mockReturnValue(1500);
  now.mockReturnValueOnce(3000);
  now.mockReturnValueOnce(4000);
  now.mockReturnValueOnce(5000);
  now.mockReturnValueOnce(5000);
  now.mockReturnValueOnce(5000);
  now.mockReturnValueOnce(5000);
  Date.now = now;

  const sampleRespose: YoutubeVideoResponse = {
    videos: [
      {
        title: "My Video",
        videoId: "my url",
        previewUrl: "https://picsum.photos/id/948/132/132?grayscale"
      }
    ]
  };
  // @ts-ignore
  searchVideos.mockReturnValueOnce(Promise.resolve(sampleRespose));

  page.render();
  page.openSearch();
  createId();
  page.enterSearch("some term");

  Math.random = () => 33;
  jest.runAllTimers();

  expect(searchVideos).toHaveBeenCalled();
}, 1000);
