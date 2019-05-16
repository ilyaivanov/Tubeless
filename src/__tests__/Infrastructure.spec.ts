import AppPageObject from "../testUtils/AppPageObject";
import { Roots } from "../tree/types";

describe("When rendering a non-existing tree (usually set as children) a meaningful error should be thrown ", () => {
  it("sample", () => {
    expect(() => {
      const page = new AppPageObject({
        favoriteFirstNodes: ["non-existing1"]
      });
      page.render();
    }).toThrowError(
      `Node '${
        Roots.FAVORITES
      }' contains a non-existing child 'non-existing1'. Check children of '${
        Roots.FAVORITES
      }'`
    );
  });
});
