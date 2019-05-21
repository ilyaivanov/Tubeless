import React, { useState, Fragment } from "react";
import { Nodes } from "../tree/types";
import { DragContext } from "../tree/dnd";
import Tree from "../tree/Tree";
import { onCreateNode } from "../tree/treeActions";

export type TestNodeId = "2" | "3";

const TestTree = ({ ids }: { ids: TestNodeId[] }) => {
  const nodesTree: Nodes = {
    ["TEST"]: {
      type: "root",
      id: "TEST",
      text: "sample",
      children: ids
    },
    "2": {
      type: "video",
      id: "2",
      text: "Node 2",
      children: []
    }
  };

  const [nodes, setNodes] = useState(nodesTree);
  const [placement, setPlacemnet] = useState({});

  const addNewNodeForFavorites = () => setNodes(onCreateNode(nodes, "TEST"));
  return (
    <DragContext>
      <Fragment>
        <Tree
          level={0}
          ids={nodes["TEST"].children as string[]}
          onPlay={() => 42}
          placement={placement}
          setPlacement={setPlacemnet}
          nodes={nodes}
          setNodes={setNodes}
        />
        <button data-testid="add-new-node" onClick={addNewNodeForFavorites}>
          add
        </button>
      </Fragment>
    </DragContext>
  );
};

export default TestTree;
