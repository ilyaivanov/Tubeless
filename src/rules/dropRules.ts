import { Placement, Tree } from "../types";
import { except, getParentKey, moveItemIntoIndex } from "./rules";

export function handleDrop(tree: Tree, action: Placement): Tree {
  const dropTargetParent = getParentKey(tree.nodes, action.id);

  if (action.relativeShift === 1) {
    return insertAsSubchild(tree, action);
  } else if (dropTargetParent)
    return updateChildren(
      removeChild(tree, action.itemBeingDragged),
      dropTargetParent,
      children => moveItemInContext(children, action)
    );
  else {
    return updateRoots(tree, roots => moveItemInContext(roots, action));
  }
}

const insertAsSubchild = (tree: Tree, action: Placement) =>
  updateChildren(
    removeChild(tree, action.itemBeingDragged),
    action.id,
    children => [action.itemBeingDragged].concat(children)
  );

const removeChild = (tree: Tree, id: string) => {
  const parent = getParentKey(tree.nodes, id);
  if (!parent) {
    return {
      nodes: tree.nodes,
      roots: except(tree.roots, id)
    };
  } else {
    return updateChildren(tree, parent, children => except(children, id));
  }
};

const updateChildren = (
  tree: Tree,
  id: string,
  updater: (node: string[]) => string[]
) => ({
  roots: tree.roots,
  nodes: {
    ...tree.nodes,
    [id]: {
      ...tree.nodes[id],
      children: updater(tree.nodes[id].children || [])
    }
  }
});

const updateRoots = (tree: Tree, updater: (roots: string[]) => string[]) => ({
  roots: updater(tree.roots),
  nodes: tree.nodes
});

function moveItemInContext(context: string[], action: Placement): string[] {
  let index = context.indexOf(action.id);
  const targetIndex =
    action.highlightPlacement === "PLACE_AFTER" ? index + 1 : index;
  return moveItemIntoIndex(context, action.itemBeingDragged, targetIndex);
}

//curry: from most specific to least specific
