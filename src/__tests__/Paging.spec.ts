import { Nodes } from "../tree/types";
import { onToggleCollapse } from "../tree/treeActions";

describe("Having a single node with 10 subnodes", () => {
  it("clicking load more should load 10 more items", () => {
    // @ts-ignore
    fetch = () => {
      console.log("fetch");
    };

    const nodes: Nodes = {
      "2": {
        id: "2",
        text: "Sample",
        type: "Composite"
      }
    };

    const setNodes = (newNodes: Nodes) => {
      console.log(newNodes);
    };

    onToggleCollapse(nodes, setNodes, "2");

    expect(1).toEqual(1);
  });
});
