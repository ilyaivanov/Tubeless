export interface Node {
  id: string;
  text: string;
  children?: string[];
  isHidden?:boolean;
}

export interface Nodes {
  [id: string]: Node;
}

export interface TreeInfo {
  nodes: Nodes;
  roots: string[];
}


export type PlacementOrientation = "BEFORE" | "AFTER";

export type Placement = {
  id: string;
  orientation: PlacementOrientation;
  dragLevel: number;
  itemBeingDragged: string;
};
