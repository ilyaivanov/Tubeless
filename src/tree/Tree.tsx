import React, { Fragment } from "react";
import { Node, Nodes, Placement } from "./types";
import NodeElement from "./Node";
import {getParentKey} from "./treeOperations";

export interface TreeProps {
  ids: string[];
  level: number;
  nodes: Nodes;
  setNodes: (nodes: Nodes) => void;
  placement: Partial<Placement>;
  setPlacement: (placement: Partial<Placement>) => void;
  onPlay: (node: Node) => void;
}

const Tree = (props: TreeProps) => {
  const { nodes, ids, level } = props;
  validateChildren(nodes, ids);
  return (
    <Fragment>
      {ids.map(id => (
        <NodeElement {...props} key={id} node={nodes[id]} level={level}>
          {hasChildren(nodes[id]) && (
            <Tree
              {...props}
              ids={nodes[id].children as string[]}
              level={level + 1}
            />
          )}
        </NodeElement>
      ))}
    </Fragment>
  );
};

//check that all node children can be found in the Nodes tree
const validateChildren = (nodes: Nodes, children: string[]) => {
  children.forEach(node => {
    if (!nodes[node]) {
      const parent = getParentKey(nodes, node);
      throw new Error(
        `Node '${parent}' contains a non-existing child '${node}'. Check children of '${parent}'`
      );
    }
  });
};

const hasChildren = (node: Node) => node.children && !node.isHidden;

export default Tree;
