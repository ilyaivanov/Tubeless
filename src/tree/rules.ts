import { Nodes, Placement } from "./types";

export const canDragOver = (nodes: Nodes, placement: Placement) => {
  return true;
};

export const convertPlacement = (
  nodes: Nodes,
  placement: Placement
): Placement => {
  if (placement.relativeShift >= 1) {
    return {
      ...placement,
      //TODO: check if items is first
      relativeShift: placement.highlightPlacement === "PLACE_BEFORE" ? 0 : 1
    };
  }

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
