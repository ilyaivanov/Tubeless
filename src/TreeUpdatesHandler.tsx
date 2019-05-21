import React, { Fragment } from "react";
import { Node, Placement } from "./tree/types";
import Tree from "./tree/Tree";
import { searchSimilar } from "./youtube/api";
import { updateNode } from "./tree/treeOperations";
import {
  onDeleteNode,
  onSearchDone,
  onDrop,
  onSearchStart,
  toggleVisibility,
  onCreateNode
} from "./tree/treeActions";
import { mapVideosToNodes } from "./youtube/mapVideosToNodes";
import { shallowEqual } from "./utils";

const handleDrop = onDrop;

const TreeUpdatesHandler = ({
  setNodes,
  zone,
  nodes,
  placement,
  setPlacement,
  onPlay
}: any) => {
  const onToggleCollapse = (id: string) => {
    if (nodes[id].type === "video") {
      setNodes(onSearchStart(nodes, id));
      searchSimilar(nodes[id].videoUrl).then(response => {
        setNodes(onSearchDone(nodes, id, mapVideosToNodes(response)));
      });
    } else {
      setNodes(toggleVisibility(nodes, id));
    }
  };

  const updatePlacementOptimized = (newPlacement: Partial<Placement>) => {
    if (!shallowEqual(newPlacement, placement)) {
      console.count("called set placement");
      setPlacement(newPlacement);
    }
  };

  const onDrop = () => {
    setNodes(handleDrop(nodes, placement as Placement));
    setPlacement({});
  };

  const onUpdate = (newNode: Partial<Node>) => {
    if (!newNode.id) return;
    setNodes(
      updateNode(nodes, newNode.id, node => Object.assign({}, node, newNode))
    );
  };

  const addNewNode = () => setNodes(onCreateNode(nodes, zone));

  const onDelete = (node: Node) => setNodes(onDeleteNode(nodes, node.id));

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
