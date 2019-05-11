import React, { Fragment, useState } from "react";
import { twoNestedNodes } from "./sampleTrees";
import { Nodes } from "./types";
import NodeElement from "./Node";
import { updateNode } from "./treeUtils";

const Tree = () => {
  const [tree, setTree] = useState(twoNestedNodes);

  const onToggleCollapse = (id: string) => {
    setTree(
      updateNode(tree, id, node => ({
        isHidden: !node.isHidden
      }))
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <TreeImp
        nodes={tree.nodes}
        ids={tree.roots}
        level={0}
        onToggleCollapse={onToggleCollapse}
      />
    </div>
  );
};

const TreeImp = ({
  nodes,
  ids,
  level,
  onToggleCollapse
}: {
  nodes: Nodes;
  ids: string[];
  level: number;
  onToggleCollapse: any;
}) => {
  const renderChildren = (id: string) => {
    const { children } = nodes[id];
    if (children && !nodes[id].isHidden)
      return (
        <TreeImp
          nodes={nodes}
          ids={children}
          onToggleCollapse={onToggleCollapse}
          level={level + 1}
        />
      );
  };
  return (
    <Fragment>
      {ids.map(id => (
        <NodeElement
          key={id}
          onToggleCollapse={onToggleCollapse}
          node={nodes[id]}
          level={level}
        >
          {renderChildren(id)}
        </NodeElement>
      ))}
    </Fragment>
  );
};

export default Tree;
