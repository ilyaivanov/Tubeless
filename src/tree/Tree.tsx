import React, { Fragment, useState } from "react";
import { twoNestedNodes } from "./sampleTrees";
import { Nodes, Placement } from "./types";
import NodeElement from "./Node";
import { updateNode } from "./treeUtils";

const Tree = () => {
  const [tree, setTree] = useState(twoNestedNodes);

  const [placement, setPlacement] = useState({} as Partial<Placement>);

  const onToggleCollapse = (id: string) => {
    setTree(
      updateNode(tree, id, node => ({
        isHidden: !node.isHidden
      }))
    );
  };

  const onDrop = () => {
    setPlacement({});
  };

  return (
    <div style={{ padding: 5 }}>
      <TreeImp
        nodes={tree.nodes}
        ids={tree.roots}
        level={0}
        onToggleCollapse={onToggleCollapse}
        setPlacement={setPlacement}
        onDrop={onDrop}
        placement={placement}
      />
    </div>
  );
};

interface Props {
  nodes: Nodes;
  ids: string[];
  level: number;
  onToggleCollapse: (id: string) => void;
  placement: Partial<Placement>;
  setPlacement: (placement: Partial<Placement>) => void;
  onDrop: () => void;
}

const TreeImp = (props: Props) => {
  const { nodes, ids, level } = props;
  const renderChildren = (id: string) => {
    const { children } = nodes[id];
    if (children && !nodes[id].isHidden)
      return <TreeImp {...props} ids={children} level={level + 1} />;
  };
  return (
    <Fragment>
      {ids.map(id => (
        <NodeElement {...props} key={id} node={nodes[id]} level={level}>
          {renderChildren(id)}
        </NodeElement>
      ))}
    </Fragment>
  );
};

export default Tree;
