export interface Nodes {
  [id: string]: NodeType;
}

export interface Tree{
  nodes: Nodes;
  roots: string[];
}


export interface NodeType {
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
