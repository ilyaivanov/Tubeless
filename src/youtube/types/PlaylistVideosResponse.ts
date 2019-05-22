export interface PlaylistVideosResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  pageInfo: PageInfo;
  items: ItemsItem[];
}
interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
interface ItemsItem {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
}
interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: ResourceId;
}
interface Thumbnails {
  'default': Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
  standard?: Thumbnail;
  maxres?: Maxres;
}
interface Thumbnail {
  url: string;
  width?: number;
  height?: number;
}
interface ResourceId {
  kind: string;
  videoId: string;
}

interface Maxres {
  url: string;
  width: number;
  height: number;
}
