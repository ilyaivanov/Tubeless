import { twoNestedNodes } from "../tree/sampleTrees";
import { Placement } from "../tree/types";
import { drop } from "./dropRules";

it("having two nodes droping Node 2 before Node 1 should flat them out", () => {
  const tree = twoNestedNodes;
  const placement: Placement = {
    orientation: "BEFORE",
    dragLevel: 0,
    itemBeingDragged: "2",
    id: "1"
  };
  const res = drop(tree, placement);

  expect(res.nodes["1"].children).toEqual([]);
  expect(res.roots).toEqual(["2", "1"]);
});
