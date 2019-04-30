import React, { useState } from "react";
import Tree from "./tree/Tree";
import {createFlatNodes} from "./tree/nodes";
import {findRoots} from "./tree/rules";
import { Nodes, Placement } from "./tree/types";
import { handleDrop } from "./tree/dropRules";

export default () => {
  const initialNodes = createFlatNodes();
  const [tree, setTree] = useState({
    nodes: initialNodes,
    roots: findRoots(initialNodes)
  });
  
  const handleDropAction = (action: Placement) => {
    setTree(handleDrop(tree, action));
  }

  return (
    <Tree
      tree={tree}
      onDropAction={handleDropAction}
    />
  )
};
