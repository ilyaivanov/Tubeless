import React, { useState } from "react";
import Tree from "./tree/Tree";
import {createFlatNodes, createInitialNodes} from "./tree/nodes";
import {findRoots} from "./tree/rules";
import { Nodes, Placement } from "./tree/types";
import { handleDrop } from "./tree/dropRules";

export default () => {
  const initialNodes = createInitialNodes();
  const [tree, setTree] = useState({
    nodes: initialNodes,
    roots: findRoots(initialNodes)
  });
  
  const handleDropAction = (action: Placement) => {
    console.log('Drop action', action);
    setTree(handleDrop(tree, action));
  }

  return (
    <Tree
      tree={tree}
      onDropAction={handleDropAction}
    />
  )
};
