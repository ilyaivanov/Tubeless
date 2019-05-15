import { Node, Nodes } from "./types";

const sampleNodes: Nodes = {
  ...node("1", ["1.1", "1.2"]),
  ...node("1.1"),
  ...node("1.2", ["1.2.1"]),
  ...node("1.2.1"),
  ...node("2", ["2.1"]),
  ...node("2.1", ["2.1.1"]),
  ...node("2.1.1"),
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
  )
};

export { sampleNodes };

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
