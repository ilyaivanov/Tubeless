import { node, root, sampleNodes } from "./sampleTrees";
import { onDrop} from "./treeActions";
import { Nodes, Roots } from "./types";

describe("for medium sized tree", () => {
  it("when dragging a 1.2.1 node before 1.2 it should place 1.2.1 before 1.2", () => {
    const results = onDrop(sampleNodes, {
      id: "1.2",
      itemBeingDragged: "1.2.1",
      dragLevel: 2,
      orientation: "BEFORE"
    });

    expect(results[Roots.FAVORITES].children).toEqual(["1", "2", "Loading Google Playlists"]);
  });

  it("when dragging a 2 node after 1.2.1 with shift +1 it should place 2 as a first child of 1.2.1", () => {
    const results = onDrop(sampleNodes, {
      id: "1.2.1",
      itemBeingDragged: "2",
      dragLevel: 3,
      orientation: "AFTER"
    });
    expect(results[Roots.FAVORITES].children).toEqual(["1", "Loading Google Playlists"]);
    expect(results["1.2.1"].children).toEqual(["2"]);
  });

  it("when dragging a 2 node over 1", () => {
    const results = onDrop(sampleNodes, {
      id: "1",
      itemBeingDragged: "2",
      dragLevel: 0,
      orientation: "BEFORE"
    });
    expect(results[Roots.FAVORITES].children).toEqual(["2", "1", "Loading Google Playlists"]);
  });
});

describe("when dropping a node from search to favorites", () => {
  it("node should be copied, not moved", () => {
    const nodes: Nodes = {
      ...node("1"),
      ...node("2"),
      ...root(["1"], Roots.FAVORITES),
      ...root(["2"], Roots.SEARCH)
    };
    const fn = jest.fn();
    fn.mockReturnValueOnce("333");
    Math.random = fn;
    const results = onDrop(nodes, {
      id: "1",
      itemBeingDragged: "2",
      dragLevel: 0,
      orientation: "BEFORE"
    });
    expect(results[Roots.FAVORITES].children).toEqual(["333", "1"]);
    expect(results["333"].text).toEqual("Node 2");
    expect(results[Roots.SEARCH].children).toEqual(["2"]);
  });


});
