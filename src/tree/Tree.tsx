import React, {Fragment} from "react";
import { Node, Nodes, Placement} from "./types";
import NodeElement from "./Node";

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

const hasChildren = (node: Node) => node.children && !node.isHidden;

export default Tree;
