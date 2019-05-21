import { Nodes, Placement, Node } from "./types";
import {
  getNodeLevel,
  getParentKey,
  getRootKey,
  updateNode,
  copyNodeDeep,
  deleteNode,
  createNode
} from "./treeOperations";
import { createId } from "../utils";
import { validateParent } from "./treeValidation";

export const onCreateNode = (nodes: Nodes, parentId: string) => {
  const id = Math.random() + "";
  const node: Node = {
    text: "New Node",
    type: "generic",
    id
  };
  const withChild = updateNode(nodes, parentId, node => ({
    children: (node.children as string[]).concat([id])
  }));
  return {
    ...withChild,
    [id]: node
  };
};

export const onDeleteNode = (nodes: Nodes, nodeId: string) =>
  deleteNode(nodes, nodeId);

export const onRenameNode = (nodes: Nodes, nodeId: string, newText: string) =>
  updateNode(nodes, nodeId, () => ({
    text: newText
  }));

export const onSearchStart = (nodes: Nodes, nodeId: string) =>
  updateNode(nodes, nodeId, () => ({
    isLoading: true
  }));

export const onSearchDone = (
  nodes: Nodes,
  parentId: string,
  newVideoNodes: Node[]
): Nodes => {
  const children = newVideoNodes.map(n => n.id);
  const withNodes = newVideoNodes.reduce(
    (state, node) => createNode(state, node),
    nodes
  );

  return updateNode(withNodes, parentId, () => ({
    children,
    isLoading: false,
    isHidden: false
  }));
};

export const toggleVisibility = (nodes: Nodes, nodeId: string) =>
  updateNode(nodes, nodeId, node => ({
    isHidden: !node.isHidden
  }));

export const onDrop = (nodes: Nodes, placement: Placement): Nodes => {
  if (placement.itemBeingDragged === placement.id) return nodes;
  if (isDraggingFromDifferentScopes(nodes, placement)) {
    const newId = createId();
    const newPlacement = {
      ...placement,
      itemBeingDragged: newId
    };
    return insertNode(
      copyNodeDeep(nodes, placement.itemBeingDragged, newId),
      newPlacement
    );
  }
  return insertNode(deleteNode(nodes, placement.itemBeingDragged), placement);
};

const insertNode = (nodes: Nodes, placement: Placement): Nodes => {
  if (placement.dragLevel !== 0) {
    const nodeLevel = getNodeLevel(nodes, placement.id);
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

export function insertDragItemAtPlacement(
  context: string[],
  action: Placement
): string[] {
  let index = context.indexOf(action.id);
  const targetIndex = action.orientation === "AFTER" ? index + 1 : index;
  const copy = [...context];
  copy.splice(targetIndex, 0, action.itemBeingDragged);
  return copy;
}
