export interface Node {
  id: string;
  text: string;
  children?: string[];
  isHidden?: boolean;

  type: "generic" | "video";
  videoUrl?: string;
  imageUrl?: string;
}

export interface Nodes {
  [id: string]: Node;
}

export interface TreeInfo {
  nodes: Nodes;
  roots: string[];
  searchRoots: string[];
}

export type PlacementOrientation = "BEFORE" | "AFTER";

export type Placement = {
  id: string;
  orientation: PlacementOrientation;
  dragLevel: number;
  itemBeingDragged: string;
};
