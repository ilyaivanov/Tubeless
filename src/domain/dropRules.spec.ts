import { sampleNodes } from "../tree/sampleTrees";
import { drop } from "./dropRules";
import { Roots } from "../tree/types";

describe("for medium sized tree", () => {
  it("when dragging a 1.2.1 node before 1.2 it should place 1.2.1 before 1.2", () => {
    const results = drop(sampleNodes, {
      id: "1.2",
      itemBeingDragged: "1.2.1",
      dragLevel: 0,
      orientation: "BEFORE"
    });

    expect(results[Roots.FAVORITES].children).toEqual(["1", "2"]);
  });

  it("when dragging a 2 node after 1.2.1 with shift +1 it should place 2 as a first child of 1.2.1", () => {
    const results = drop(sampleNodes, {
      id: "1.2.1",
      itemBeingDragged: "2",
      dragLevel: 3,
      orientation: "AFTER"
    });
    expect(results[Roots.FAVORITES].children).toEqual(["1"]);
    expect(results["1.2.1"].children).toEqual(["2"]);
  });

  it("when dragging a 2 node after before 1", () => {
    const results = drop(sampleNodes, {
      id: "1",
      itemBeingDragged: "2",
      dragLevel: 0,
      orientation: "BEFORE"
    });
    expect(results[Roots.FAVORITES].children).toEqual(["2", "1"]);
  });
});
