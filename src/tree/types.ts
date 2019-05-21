export type NodeType = "Video" | "Playlist" | "Channel" | "Root" | "Composite";

export interface Node {
  id: string;
  text: string;
  children?: string[];
  isHidden?: boolean;
  isLoading?: boolean;

  type: NodeType;
  videoUrl?: string;
  channelId?: string;
  playlistId?: string;
  imageUrl?: string;
}

export interface Nodes {
  [id: string]: Node;
}

export type PlacementOrientation = "BEFORE" | "AFTER";

export type Placement = {
  id: string;
  orientation: PlacementOrientation;
  dragLevel: number;
  itemBeingDragged: string;
};

export enum Roots {
  FAVORITES = "ROOT.favorites",
  SEARCH = "ROOT.search"
}
