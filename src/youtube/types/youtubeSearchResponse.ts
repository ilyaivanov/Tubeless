// GENERATED AND MODIFIED BY HAND
//https://transform.now.sh/json-to-ts-interface/

export interface YoutubeSearchResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: ItemsItem[];
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface ItemsItem {
  kind: string;
  etag: string;
  id: Id;
  snippet: Snippet;
}

export type ItemKind = "youtube#channel" | "youtube#playlist" | "youtube#video";

interface Id {
  kind: ItemKind;
  playlistId?: string;
  videoId?: string;
  channelId?: string;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
}

interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
}

interface Thumbnail {
  url: string;
  width?: number;
  height?: number;
}
