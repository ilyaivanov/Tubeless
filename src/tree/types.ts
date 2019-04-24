export interface Nodes {
  [id: string]: Node;
}

export interface Tree{
  nodes: Nodes;
  roots: string[];
}


interface Node {
  text: string;
  id: string;
  children?: string[];
}
export interface Placement {
  itemBeingDragged: string;
  id: string;
  highlightPlacement: "PLACE_BEFORE" | "PLACE_AFTER";
  relativeShift: number;
}
