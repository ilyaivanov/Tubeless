import {Nodes, Placement} from "../types";

export const canDragOver = (nodes: Nodes, placement: Placement) => {
  return true;
};

export const convertPlacement = (
  nodes: Nodes,
  placement: Placement
): Placement => {
  if (placement.relativeShift >= 1) {
    const parent = getParentKey(nodes, placement.id);
    let isFirst = false;
    if (parent) {
      const children = nodes[parent].children;
      if (children) {
        isFirst = children[0] === placement.id;
      }
    }
    return {
      ...placement,
      relativeShift:
        placement.highlightPlacement === "PLACE_BEFORE" && isFirst ? 0 : 1
    };
  }

  //TODO: handle when placing an items before with previous item having a very deep nesting area
  //TODO: handle case when item is being place inside itself
  return placement;
};

export const findRoots = (nodes: Nodes): string[] =>
  Object.keys(nodes).filter(id => !getParentKey(nodes, id));

export const getParentKey = (
  nodes: Nodes,
  nodeId: string
): string | undefined =>
  Object.keys(nodes).find(key => contains(nodes[key].children, nodeId));

//Array utils
function contains<T>(array: T[] | undefined, item: T): boolean {
  return !!array && array.indexOf(item) >= 0;
}

export function areEqualShallow(a: any, b: any) {
  for (var key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}

export function except<T>(items: T[], item: T): T[] {
  return items.filter(i => i !== item);
}

export function moveItemIntoIndex<T>(items: T[], itemToMove: T, targetIndex: number): T[] {
  const itemIndex = items.indexOf(itemToMove);
  const copy = [...items];
  copy.splice(targetIndex, 0, itemToMove);

  if (itemIndex >= 0) {
    const indexToRemove = itemIndex < targetIndex ? itemIndex : itemIndex + 1;
    copy.splice(indexToRemove, 1);
  }
  return copy;
}
