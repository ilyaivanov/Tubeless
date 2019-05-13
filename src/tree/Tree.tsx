import React, { Fragment } from "react";
import { Node, Nodes, Placement, TreeInfo } from "./types";
import NodeElement from "./Node";

interface Props {
  tree: TreeInfo;
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

const Tree = (props: Props) => {
  const { tree, ids, level } = props;
  return (
    <Fragment>
      {ids.map(id => (
        <NodeElement {...props} key={id} node={tree.nodes[id]} level={level}>
          {hasChildren(tree.nodes[id]) && (
            <Tree
              {...props}
              ids={tree.nodes[id].children as string[]}
              level={level + 1}
            />
          )}
        </NodeElement>
      ))}
    </Fragment>
  );
};

const hasChildren = (node: Node) => node.children && !node.isHidden;

export default Tree;
