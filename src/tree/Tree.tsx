import React, {Fragment} from "react";
import {Node, Nodes, Placement} from "./types";
import NodeElement from "./Node";

interface Props {
  nodes: Nodes;
  ids: string[];
  level: number;
  onToggleCollapse: (id: string) => void;
  placement: Partial<Placement>;
  setPlacement: (placement: Partial<Placement>) => void;
  onDrop: () => void;
}

const Tree = (props: Props) => {
  const {nodes, ids, level} = props;
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
