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
  it("when droping a 1.2.1 node before 1.2 it should place 1.2.1 before 1.2", () => {
    const results = drop(mediumSizedTree, {
      id: "1.2",
      itemBeingDragged: "1.2.1",
      dragLevel: 0,
      orientation: "BEFORE"
    });
    expect(results.roots).toEqual(["1", "2"]);
  });
});
