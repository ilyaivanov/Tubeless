import { canDragOver, convertPlacement } from "./rules";
import {Placement} from "./types";
import {createTwoFlatNodes} from "./nodes";

describe("having a two nodes", () => {
  it("should be possible to place Item 2 before Item 1", () => {
    const placement: Placement = {
      relativeShift: 0,
      highlightPlacement: "PLACE_BEFORE",
      id: "Item 1",
      itemBeingDragged: "Item 2"
    };
    expect(canDragOver(createTwoFlatNodes(), placement)).toBe(true);
  });
});
//
// describe("having a two nodes", () => {
//   const nodes = [
//     node("Item 1", [node("Item 1.1")]),
//     node("Item 2")
//   ];
//
//   it("should be possible to place Item 2 before Item 1", () => {
//     const placement: Placement = {
//       relativeShift: 1,
//       highlightPlacement: "PLACE_BEFORE",
//       id: "Item 1.1",
//       itemBeingDragged: "Item 2"
//     };
//     expect(convertPlacement(nodes, placement).relativeShift).toEqual(0);
//   });
// });
