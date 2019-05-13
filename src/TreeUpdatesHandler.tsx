import React, { Fragment, useState } from "react";
import { Node, Placement } from "./tree/types";
import { drop, removeNode, updateNode } from "./domain/dropRules";
import { shallowEqual } from "./domain/shallowCompare";
import Tree from "./tree/Tree";

const TreeUpdatesHandler = ({ setTree, tree, onPlay }: any) => {
  const [placement, setPlacement] = useState({} as Partial<Placement>);

  const onToggleCollapse = (id: string) => {
    setTree(
      updateNode(tree, id, node => ({
        isHidden: !node.isHidden
      }))
    );
  };

  const updatePlacementOptimized = (newPlacement: Partial<Placement>) => {
    if (!shallowEqual(newPlacement, placement)) setPlacement(newPlacement);
  };

  const onDrop = () => {
    setTree(drop(tree, placement as Placement));
    setPlacement({});
  };

  const onUpdate = (newNode: Partial<Node>) => {
    if (!newNode.id) return;
    setTree(
      updateNode(tree, newNode.id, node => Object.assign({}, node, newNode))
    );
  };

  const addNewNode = () => {
    const id = Math.random() + "";
    const node: Node = {
      text: "New Node",
      type: "generic",
      id
    };
    setTree({
      nodes: {
        ...tree.nodes,
        [id]: node
      },
      roots: tree.roots.concat([id])
    });
  };

  const onDelete = (node: Node) => setTree(removeNode(tree, node.id));
  return (
    <Fragment>
      <Tree
        tree={tree}
        ids={tree.roots}
        level={0}
        onToggleCollapse={onToggleCollapse}
        setPlacement={updatePlacementOptimized}
        onDrop={onDrop}
        onPlay={onPlay}
        onDelete={onDelete}
        onUpdate={onUpdate}
        placement={placement}
      />
      <button data-testid="add-new-node" onClick={addNewNode}>
        add
      </button>
    </Fragment>
  );
};

export default TreeUpdatesHandler;
