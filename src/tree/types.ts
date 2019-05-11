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
