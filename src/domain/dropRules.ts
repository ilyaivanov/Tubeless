import { Nodes, Placement } from "../tree/types";
import {
  getRootKey,
  copyNode,
  getItemLevel,
  validateParent,
  updateNode,
  removeNode,
  getParentKey,
  insertDragItemAtPlacement,
  createId
} from "./nodes.utils";

export const drop = (nodes: Nodes, placement: Placement): Nodes => {
  if (placement.itemBeingDragged === placement.id) return nodes;
  if (isDraggingFromDifferentScopes(nodes, placement)) {
    const newId = createId();
    const newPlacement = {
      ...placement,
      itemBeingDragged: newId
    };
    return insertNode(
      copyNode(nodes, placement.itemBeingDragged, newId),
      newPlacement
    );
  }
  return insertNode(removeNode(nodes, placement.itemBeingDragged), placement);
};

const insertNode = (nodes: Nodes, placement: Placement): Nodes => {
  if (placement.dragLevel !== 0) {
    const nodeLevel = getItemLevel(nodes, placement.id);
    if (placement.dragLevel > nodeLevel) {
      return updateNode(nodes, placement.id, node => ({
        children: [placement.itemBeingDragged].concat(node.children || [])
      }));
    }
  }

  const parent = validateParent(
    getParentKey(nodes, placement.id),
    placement.id
  );
  return updateNode(nodes, parent, node => ({
    children: insertDragItemAtPlacement(node.children as string[], placement)
  }));
};


const isDraggingFromDifferentScopes = (nodes: Nodes, placement: Placement) =>
  getRootKey(nodes, placement.id) !==
  getRootKey(nodes, placement.itemBeingDragged);
