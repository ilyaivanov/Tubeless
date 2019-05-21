import AppPageObject from "../testUtils/AppPageObject";
import { SearchResponse, searchVideos } from "../youtube/api";
import { act } from "react-testing-library";

jest.mock("../youtube/api", () => ({
  searchVideos: jest.fn()
}));

xit("when entering some search term it should display search results", async () => {
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

  const sampleRespose: SearchResponse = {
    items: [
      {
        title: "My Video",
        type: 'Video',
        videoId: "my url",
        previewUrl: "https://picsum.photos/id/948/132/132?grayscale"
      }
    ]
  };
  // @ts-ignore
  searchVideos.mockReturnValueOnce(Promise.resolve(sampleRespose));

  page.render();
  page.openSearch();

  Math.random = () => 33;
  act(() => {
    page.enterSearch("some term");
    jest.runAllTimers();
  });

  expect(searchVideos).toHaveBeenCalled();

  expect(page.getNode("33")).toBeDefined();
}, 1000);
