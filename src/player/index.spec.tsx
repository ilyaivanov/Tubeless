import {
  cleanup,
  render,
  RenderResult,
  fireEvent
} from "react-testing-library";
import * as React from "react";
import App from "../App";
import "jest-dom/extend-expect";

jest.mock("react-youtube", () => (props: any) => {
  return <div {...props} />;
});

jest.mock("../tree/sampleTrees", () => ({
  sampleNodes: jest.requireActual("../tree/sampleTrees").twoVideos
}));

describe("Having two youtube videos", () => {
  let rendered: RenderResult;
  afterEach(cleanup);

  beforeEach(() => {
    rendered = render(<App />);
  });

  describe("clicking on a play button in one of those videos", () => {
    it("should render a Youtube video with that id", () => {
      fireEvent.click(
        rendered.getByTestId("video-image-Carbon Based Lifeforms Album 1")
      );
      expect(rendered.getByTestId("player")).toHaveAttribute(
        "videoId",
        "f5ddAAYasgM"
      );
    });
  });
});
