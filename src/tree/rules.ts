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
