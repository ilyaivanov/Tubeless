import React, { useState } from "react";
import Tree from "./Tree";
import { createFlatNodes, createInitialNodes } from "./sampleNodes";
import { findRoots } from "./rules/rules";
import { Nodes, Placement } from "./types";
import { handleDrop } from "./rules/dropRules";

export default () => {
  const initialNodes = createInitialNodes();
  const [tree, setTree] = useState({
    nodes: initialNodes,
    roots: findRoots(initialNodes)
  });

  const handleDropAction = (action: Placement) => {
    setTree(handleDrop(tree, action));
    console.log("Drop action", action, handleDrop(tree, action));
  };

  return <Tree tree={tree} onDropAction={handleDropAction} />;
};
