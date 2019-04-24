import { Nodes, Placement } from "./types";

export const canDragOver = (nodes: Nodes, placement: Placement) => {
  return true;
};

export const convertPlacement = (
  nodes: Nodes,
  placement: Placement
): Placement => {
  if (placement.relativeShift >= 1) {
    const parent = getParentKey(nodes, placement.id);
    const isFirst = parent && nodes[parent].children && nodes[parent].children[0] === placement.id;
    return {
      ...placement,
      relativeShift: placement.highlightPlacement === "PLACE_BEFORE" && isFirst ? 0 : 1
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
