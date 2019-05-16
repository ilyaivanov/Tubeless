import React, { Fragment } from "react";
import { Node, Nodes, Placement } from "./types";
import NodeElement from "./Node";
import { getParentKey } from "../domain/nodes.utils";

export interface TreeProps {
  nodes: Nodes;
  ids: string[];
  level: number;
  onToggleCollapse: (id: string) => void;
  placement: Partial<Placement>;
  setPlacement: (placement: Partial<Placement>) => void;
  onDrop: () => void;
  onPlay: (node: Node) => void;
  onDelete: (node: Node) => void;
  onUpdate: (node: Partial<Node>) => void;
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
