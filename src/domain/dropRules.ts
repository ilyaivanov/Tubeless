import { Node, Nodes, Placement, TreeInfo } from "../tree/types";

export const drop = (nodes: Nodes, placement: Placement): Nodes => {
  if (placement.itemBeingDragged === placement.id) return nodes;
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

//Tree utils
export const removeNode = (nodes: Nodes, nodeId: string) => {
  const parent = validateParent(getParentKey(nodes, nodeId), nodeId);
  return updateNode(nodes, parent, node => ({
    children: except(node.children, nodeId)
  }));
};

const getItemLevel = (nodes: Nodes, nodeId: string) => {
  let level = -1;
  let parent = getParentKey(nodes, nodeId);
  while (parent) {
    level += 1;
    parent = getParentKey(nodes, parent);
  }
  return level;
};

export const getParentKey = (
  nodes: Nodes,
  nodeId: string
): string | undefined =>
  Object.keys(nodes).find(key => contains(nodes[key].children, nodeId));

export const updateNode = (
  nodes: Nodes,
  id: string,
  updated: (node: Node) => Partial<Node>
): Nodes => {
  return {
    ...nodes,
    [id]: {
      ...nodes[id],
      ...updated(nodes[id])
    }
  };
};

function insertDragItemAtPlacement(
  context: string[],
  action: Placement
): string[] {
  let index = context.indexOf(action.id);
  const targetIndex = action.orientation === "AFTER" ? index + 1 : index;
  const copy = [...context];
  copy.splice(targetIndex, 0, action.itemBeingDragged);
  return copy;
}

//Array utils
function contains<T>(array: T[] | undefined, item: T): boolean {
  return !!array && array.indexOf(item) >= 0;
}

function except<T>(items: T[] | undefined, item: T): T[] {
  if (!items) return [];
  return items.filter(i => i !== item);
}

export const validateParent = (
  parentId: string | undefined,
  nodeId: string
): string => {
  if (!parentId)
    throw new Error(
      "Expected parent for node " + nodeId + ", but not " + parentId
    );
  return parentId;
};
