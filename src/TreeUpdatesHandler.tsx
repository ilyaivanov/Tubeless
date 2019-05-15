import React, { Fragment, useState } from "react";
import { Node, Placement } from "./tree/types";
import { drop, removeNode, updateNode } from "./domain/dropRules";
import { shallowEqual } from "./domain/shallowCompare";
import Tree from "./tree/Tree";

const TreeUpdatesHandler = ({
  setNodes,
  zone,
  nodes,
  placement,
  setPlacement,
  onPlay
}: any) => {
  const onToggleCollapse = (id: string) => {
    setNodes(
      updateNode(nodes, id, node => ({
        isHidden: !node.isHidden
      }))
    );
  };

  const updatePlacementOptimized = (newPlacement: Partial<Placement>) => {
    if (!shallowEqual(newPlacement, placement)) setPlacement(newPlacement);
  };

  const onDrop = () => {
    setNodes(drop(nodes, placement as Placement));
    setPlacement({});
  };

  const onUpdate = (newNode: Partial<Node>) => {
    if (!newNode.id) return;
    setNodes(
      updateNode(nodes, newNode.id, node => Object.assign({}, node, newNode))
    );
  };

  const addNewNode = () => {
    //TODO: consider extract specific node creation logic
    const id = Math.random() + "";
    const node: Node = {
      text: "New Node",
      type: "generic",
      id
    };
    const withChild = updateNode(nodes, zone, node => ({
      children: (node.children as string[]).concat([id])
    }));
    setNodes({
      ...withChild,
      [id]: node
    });
  };

  const onDelete = (node: Node) => setNodes(removeNode(nodes, node.id));
  return (
    <Fragment>
      <Tree
        nodes={nodes}
        ids={nodes[zone].children}
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
