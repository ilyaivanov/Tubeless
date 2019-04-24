import React from "react";
import Tree from "./tree/Tree";
import {createInitialNodes} from "./tree/nodes";
import {findRoots} from "./tree/rules";

export default () => (
  <Tree
    tree={{
      nodes: createInitialNodes(),
      roots: findRoots(createInitialNodes())
    }}
  />
);
