import {canDragOver} from "./rules";
import {Placement} from "./types";
import {createFlatNodes} from "./nodes";

describe("having a two nodes", () => {
  it("should be possible to place Item 2 before Item 1", () => {
    const placement: Placement = {
      relativeShift: 0,
      highlightPlacement: "PLACE_BEFORE",
      id: "Item 1",
      itemBeingDragged: "Item 2"
    };
    expect(canDragOver(createFlatNodes(), placement)).toBe(true);
  });
});
