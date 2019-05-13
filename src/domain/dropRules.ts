import { Node, Nodes, Placement, TreeInfo } from "../tree/types";

export const drop = (tree: TreeInfo, placement: Placement): TreeInfo => {
  if (placement.itemBeingDragged === placement.id) return tree;
  return insertNode(removeNode(tree, placement.itemBeingDragged), placement);
};

const insertNode = (tree: TreeInfo, placement: Placement) => {
  if (placement.dragLevel !== 0) {
    const nodeLevel = getItemLevel(tree, placement.id);
    if (placement.dragLevel > nodeLevel) {
      return updateNode(tree, placement.id, node => ({
        children: [placement.itemBeingDragged].concat(node.children || [])
      }));
    }
  }

  const parent = getParentKey(tree.nodes, placement.id);
  if (parent)
    return updateNode(tree, parent, node => ({
      children: insertDragItemAtPlacement(node.children as string[], placement)
    }));
  else
    return updateRoots(tree, roots =>
      insertDragItemAtPlacement(roots, placement)
    );
};

//Tree utils
export const removeNode = (tree: TreeInfo, nodeId: string) => {
  const parent = getParentKey(tree.nodes, nodeId);
  if (parent)
    return updateNode(tree, parent, node => ({
      children: except(node.children, nodeId)
    }));
  else return updateRoots(tree, roots => except(roots, nodeId));
};

const getItemLevel = (tree: TreeInfo, nodeId: string) => {
  let level = 0;
  let parent = getParentKey(tree.nodes, nodeId);
  while (parent) {
    level += 1;
    parent = getParentKey(tree.nodes, parent);
  }
  return level;
};

export const getParentKey = (
  nodes: Nodes,
  nodeId: string
): string | undefined =>
  Object.keys(nodes).find(key => contains(nodes[key].children, nodeId));

const updateRoots = (
  tree: TreeInfo,
  updater: (roots: string[]) => string[]
) => ({
  roots: updater(tree.roots),
  nodes: tree.nodes
});

export const updateNode = (
  tree: TreeInfo,
  id: string,
  updated: (node: Node) => Partial<Node>
): TreeInfo => {
  return {
    ...tree,
    nodes: {
      ...tree.nodes,
      [id]: {
        ...tree.nodes[id],
        ...updated(tree.nodes[id])
      }
    }
  };
};

export const getRoots = (nodes: Nodes) =>
  Object.keys(nodes).filter(nodeId => !getParentKey(nodes, nodeId));

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
