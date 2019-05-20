import React, {useState} from "react";
import {Nodes} from "../tree/types";
import {DragContext} from "../tree/dnd";
import TreeUpdatesHandler from "../TreeUpdatesHandler";

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

  return (
    <DragContext>
      <TreeUpdatesHandler
        zone={"TEST"}
        placement={{}}
        setPlacement={() => 42}
        nodes={nodes}
        setNodes={setNodes}
      />
    </DragContext>
  );
};


export default TestTree;
