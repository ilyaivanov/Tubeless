import { Node, Nodes, NodeType, Roots } from "./types";
import { createId } from "../utils";

const sampleNodes: Nodes = {
  ...node("1", ["1.1", "1.2"]),
  ...node("1.1"),
  ...node("1.2", ["1.2.1"]),
  ...node("1.2.1"),
  ...node("2", ["2.1"]),
  ...node("2.1", ["2.1.1"]),
  ...node("2.1.1"),
  ...createLoader("Loading Google Playlists", {
    channelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw"
  }),
  ...node("Ambient", [
    "Carbon Based Lifeforms Album 1",
    "Carbon Based Lifeforms Album 2"
  ]),
  ...video(
    "Carbon Based Lifeforms Album 1",
    "f5ddAAYasgM",
    "https://picsum.photos/id/190/132/132?grayscale"
  ),
  ...video(
    "Carbon Based Lifeforms Album 2",
    "KQE29az48gM",
    "https://picsum.photos/id/191/132/132?grayscale"
  ),
  ...playlist(
    "MyPlaylist",
    "MyPlaylistId",
    "https://picsum.photos/id/192/132/132?grayscale"
  ),
  ...root(["1", "2", "Loading Google Playlists"], Roots.FAVORITES),
  ...root(["Ambient"], Roots.SEARCH)
};

export { sampleNodes };

export function node(id: string, children?: string[]) {
  const node: Node = {
    id,
    text: "Node " + id,
    children,
    type: "Composite"
  };
  return {
    [id]: node
  };
}

function video(label: string, videoUrl: string, imageUrl: string) {
  const node: Node = {
    id: label,
    text: label,
    type: "Video",
    imageUrl,
    videoUrl
  };
  return {
    [label]: node
  };
}

function playlist(label: string, playlistId: string, imageUrl: string) {
  const node: Node = {
    id: label,
    text: label,
    type: "Playlist",
    imageUrl,
    playlistId
  };
  return {
    [label]: node
  };
}

function createLoader(id: string, options: { channelId: string }) {
  return {
    [id]: {
      ...createPlaylistLoader(options.channelId),
      id
    }
  };
}

export function createPlaylistLoader(channelId: string): Node {
  return {
    id: createId(),
    text: "Playlists",
    type: "Composite",
    isHidden: true,
    loader: {
      type: "Playlists",
      channelId
    }
  };
}

export function root(nodes: string[], rootType: Roots) {
  const node: Node = {
    id: rootType,
    text: rootType,
    children: nodes,
    type: "Root"
  };
  return {
    [rootType]: node
  };
}
