//https://transform.now.sh/json-to-ts-interface/
// GENERATED CODE FROM SAMPLE RESPONSE
export interface SearchResponse {
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

interface ItemsItem {
  kind: string;
  etag: string;
  id: Id;
  snippet: Snippet;
}

interface Id {
  kind: string;
  videoId: string;
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
  default: {
    url: string;
    width: number;
    height: number;
  };
  medium: Medium;
  high: High;
}

interface Medium {
  url: string;
  width: number;
  height: number;
}

interface High {
  url: string;
  width: number;
  height: number;
}
