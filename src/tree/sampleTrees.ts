import { TreeInfo, Node, Nodes } from "./types";
import { getRoots } from "../domain/dropRules";

export const twoNestedNodes: TreeInfo = {
  nodes: {
    ...node("1", ["2"]),
    ...node("2")
  },
  roots: ["1"]
};

export const mediumSizedTree: TreeInfo = {
  nodes: {
    ...node("1", ["1.1", "1.2"]),
    ...node("1.1"),
    ...node("1.2", ["1.2.1"]),
    ...node("1.2.1"),
    ...node("2", ["2.1"]),
    ...node("2.1", ["2.1.1"]),
    ...node("2.1.1")
  },
  roots: ["1", "2"]
};

const videoNodes: Nodes = {
  ...node("Ambient", ["Carbon Based Lifeforms Album 1", "Carbon Based Lifeforms Album 2"]),
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
  ...node("1", ["1.1"]),
  ...node("1.1"),
};

export const twoVideos: TreeInfo = {
  nodes: videoNodes,
  roots: getRoots(videoNodes)
};

export const sampleNodes = twoVideos;

function node(id: string, children?: string[]) {
  const node: Node = {
    id,
    text: "Node " + id,
    children,
    type: "generic"
  };
  return {
    [id]: node
  };
}

function video(label: string, videoUrl: string, imageUrl: string) {
  const node: Node = {
    id: label,
    text: label,
    type: "video",
    imageUrl,
    videoUrl
  };
  return {
    [label]: node
  };
}
