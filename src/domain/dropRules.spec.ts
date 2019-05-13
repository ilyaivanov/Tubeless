import { mediumSizedTree, twoNestedNodes } from "../tree/sampleTrees";
import { drop } from "./dropRules";

it("having two nodes droping Node 2 before Node 1 should flat them out", () => {
  const res = drop(twoNestedNodes, {
    orientation: "BEFORE",
    dragLevel: 0,
    itemBeingDragged: "2",
    id: "1"
  });
  expect(res.nodes["1"].children).toEqual([]);
  expect(res.roots).toEqual(["2", "1"]);
});

describe("for medium sized tree", () => {
  it("when dragging a 1.2.1 node before 1.2 it should place 1.2.1 before 1.2", () => {
    const results = drop(mediumSizedTree, {
      id: "1.2",
      itemBeingDragged: "1.2.1",
      dragLevel: 0,
      orientation: "BEFORE"
    });
    expect(results.roots).toEqual(["1", "2"]);
  });

  it("when dragging a 2 node after 1.2.1 with shift +1 it should place 2 as a first child of 1.2.1", () => {
    const results = drop(mediumSizedTree, {
      id: "1.2.1",
      itemBeingDragged: "2",
      dragLevel: 3,
      orientation: "AFTER"
    });
    expect(results.roots).toEqual(["1"]);
    expect(results.nodes["1.2.1"].children).toEqual(["2"]);
  });
});