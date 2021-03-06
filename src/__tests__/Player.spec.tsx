import * as React from "react";
import "jest-dom/extend-expect";
import AppPage from "../testUtils/AppPageObject";

jest.mock("react-youtube", () => (props: any) => {
  return <div {...props} />;
});

describe("Having two youtube videos", () => {
  const app = new AppPage({
    favoriteFirstNodes: ["Carbon Based Lifeforms Album 1"]
  });

  describe("clicking on a play button in one of those videos", () => {
    it("should render a Youtube video with that id", () => {
      app.clickOnImage("Carbon Based Lifeforms Album 1");

      expect(app.getPlayer()).toHaveAttribute("videoId", "f5ddAAYasgM");
    });
  });
});
