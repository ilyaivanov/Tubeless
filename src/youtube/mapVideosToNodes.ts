import { ItemType, SearchItem, SearchResponse } from "./api";
import { Node, NodeType } from "../tree/types";
import { createId } from "../utils";

export const mapVideosToNodes = (response: SearchResponse): Node[] => {
  return response.items.map(mapItem);
};

const mapItem = (item: SearchItem): Node => {
  return {
    id: createId(),
    text: item.title,
    ...getSpecific(item),
    imageUrl: item.previewUrl,
    isHidden: true
  };
};

const getSpecific = (item: SearchItem) => ({
  type: getNodeType(item.type),
  videoUrl: (item as any).videoId,
  channelId: (item as any).channelId,
  playlistId: (item as any).playlistId
});

//TODO: Consider not using enums but just simple strings
const getNodeType = (type: ItemType): NodeType =>
  type === "Video" ? "Video" : type === "Playlist" ? "Playlist" : "Channel";
