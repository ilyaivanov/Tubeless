export interface Node {
  text: string;
  id: string;
  chidlren?: [];
}

export type Nodes = Node[];

export interface Placement {
  itemBeingDragged: string;
  id: string;
  highlightPlacement: 'PLACE_BEFORE' | 'PLACE_AFTER';
  relativeShift: number;
}
