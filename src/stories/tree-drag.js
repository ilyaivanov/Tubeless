import React from "react";
import {storiesOf} from "@storybook/react";
import {createInitialNodes} from "../tree/nodes";
import Tree from "../tree/Tree";
import {findRoots} from "../tree/rules";

storiesOf("Dragging Tree", module).add("dragafter", () => (
  <Tree
    tree={{
      nodes: createInitialNodes(),
      roots: findRoots(createInitialNodes()),
    }}
  />
));
