import React, { Fragment, useState } from "react";
import { Nodes } from "../tree/types";
import { DragContext } from "../tree/dnd";
import Tree from "../tree/Tree";
import { onCreateNode } from "../tree/treeActions";

export type TestNodeId = "2" | "3" | "MyPlaylistNodeId";

const TestTree = ({ ids }: { ids: TestNodeId[] }) => {
  const nodesTree: Nodes = {
    ["TEST"]: {
      type: "Root",
      id: "TEST",
      text: "sample",
      children: ids
    },
    "2": {
      type: "Video",
      id: "2",
      text: "Node 2",
      isHidden: true,
      children: []
    },
    MyPlaylistNodeId: {
      type: "Playlist",
      id: "MyPlaylistNodeId",
      text: "Sample Playlist",
      playlistId: "MyPlaylistId",
      children: []
    }
  };

  const [nodes, setNodes] = useState(nodesTree);
  const [placement, setPlacemnet] = useState({});

  const addNewNodeForFavorites = () => setNodes(onCreateNode(nodes, "TEST"));

  const s = (nodes: Nodes) => {
    console.log(nodes);
    setNodes(nodes);
  };
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
          setNodes={s}
        />
        <button data-testid="add-new-node" onClick={addNewNodeForFavorites}>
          add
        </button>
      </Fragment>
    </DragContext>
  );
};

export default TestTree;
