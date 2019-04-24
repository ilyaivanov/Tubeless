import { canDragOver, convertPlacement } from "./rules";
import { expectTrue } from "./testingUtils";
import {Placement} from "./types";

const node = (text: string, children?: {}[]) => ({
  text,
  id: text,
  children
});

describe("having a two nodes", () => {
  const nodes = [node("Item 1"), node("Item 2")];

  it("should be possible to place Item 2 before Item 1", () => {
    const placement: Placement = {
      relativeShift: 0,
      highlightPlacement: "PLACE_BEFORE",
      id: "Item 1",
      itemBeingDragged: "Item 2"
    };
    expectTrue(canDragOver(nodes, placement));
  });
});

describe("having a two nodes", () => {
  const nodes = [
    node("Item 1", [node("Item 1.1")]),
    node("Item 2")
  ];

  it("should be possible to place Item 2 before Item 1", () => {
    const placement: Placement = {
      relativeShift: 1,
      highlightPlacement: "PLACE_BEFORE",
      id: "Item 1.1",
      itemBeingDragged: "Item 2"
    };
    expect(convertPlacement(nodes, placement).relativeShift).toEqual(0);
  });
});
