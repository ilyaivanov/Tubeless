import {
  ItemKind,
  ItemsItem,
  YoutubeSearchResponse
} from "./types/youtubeSearchResponse";
import { YOUTUBE_KEY } from "../keys";
import { IS_REAL_API } from "../featureToggles";
import { searchFaked } from "./types/fakedResponses";
import { SimilarResponse } from "./types/similarResponse";
import { PlaylistVideosResponse } from "./types/PlaylistVideosResponse";

export type ItemType = "Video" | "Channel" | "Playlist";

interface Item {
  title: string;
  previewUrl: string;
}

interface VideoItem extends Item {
  type: "Video";
  videoId: string;
}

interface ChannelItem extends Item {
  type: "Channel";
  channelId: string;
}

interface PlaylistItem extends Item {
  type: "Playlist";
  playlistId: string;
}

export type SearchItem = VideoItem | ChannelItem | PlaylistItem;

export interface YoutubeResponse {
  nextPageToken?: string;
  totalResults?: number;
  items: SearchItem[];
}

export const searchVideos = (
  term: string,
  pageToken?: string
): Promise<YoutubeResponse> =>
  IS_REAL_API
    ? fetch(
        url("search", {
          part: "snippet",
          shart: "mostPopular",
          maxResults: 10,
          pageToken,
          q: logRequest(term, "search")
        })
      )
        .then(response => response.json())
        .then((data: YoutubeSearchResponse) => ({
          //TODO: extract duplication
          nextPageToken: data.nextPageToken,
          totalResults: data.pageInfo.totalResults,
          items: data.items
            .filter(item => isItemSupported(item.id.kind))
            .map(parseItem)
        }))
    : Promise.resolve(searchFaked(term));

export const searchSimilar = (
  videoId: string,
  pageToken?: string
): Promise<YoutubeResponse> =>
  fetchJson(
    url("search", {
      part: "snippet",
      type: "video",
      maxResults: 10,
      relatedToVideoId: videoId,
      pageToken
    })
  )
    .then((data: SimilarResponse) => ({
      //TODO: extract duplication
      nextPageToken: data.nextPageToken,
      totalResults: data.pageInfo.totalResults,
      items: data.items
        .filter(v => v.id.videoId)
        .map(s => ({
          ...mapTitle(s.snippet),
          type: "Video",
          videoId: s.id.videoId,
          previewUrl: s.snippet.thumbnails.default.url
        }))
    }));

export const getPlaylistVideos = (
  playlistId: string,
  pageToken?: string
): Promise<YoutubeResponse> => {
  logRequest(playlistId, "playlistItems");
  if (IS_REAL_API) {
    return fetchJson(
      url("playlistItems", {
        part: "snippet",
        playlistId,
        maxResults: 20,
        pageToken
      })
    )
      .then((data: PlaylistVideosResponse) => ({
        //TODO: extract duplication
        nextPageToken: data.nextPageToken,
        totalResults: data.pageInfo.totalResults,
        items: data.items.map(item => ({
          ...mapTitle(item.snippet),
          type: "Video",
          videoId: item.snippet.resourceId.videoId,
          previewUrl: item.snippet.thumbnails.default.url
        }))
      }));
  }
  throw new Error("Faked playlistItems is not supported yet");
};
export const getChannelVideos = (
  channelId: string,
  pageToken?: string
): Promise<YoutubeResponse> => {
  logRequest(channelId, "videos for channel");
  if (IS_REAL_API) {
    return fetchJson(
      url("search", {
        part: "snippet",
        channelId,
        maxResults: 20,
        order: "date",
        type: "video",
        pageToken
      })
    )
      .then((data: YoutubeSearchResponse) => ({
        //TODO: extract duplication
        nextPageToken: data.nextPageToken,
        totalResults: data.pageInfo.totalResults,
        items: data.items.map(parseItem)
      }));
  }
  throw new Error("Faked getChannelVideos is not supported yet");
};
export const getPlaylistsForChannel = (
  channelId: string,
  pageToken?: string
): Promise<YoutubeResponse> => {
  logRequest(channelId, "playlists for channel");
  if (IS_REAL_API) {
    return fetchJson(
      url("playlists", {
        part: "snippet%2CcontentDetails",
        channelId,
        maxResults: 25,
        pageToken
      })
    )
      .then((data: any) => ({
        //TODO: extract duplication
        nextPageToken: data.nextPageToken,
        totalResults: data.pageInfo.totalResults,
        items: data.items.map((item: any) => ({
          ...mapTitle(item.snippet),
          previewUrl: item.snippet.thumbnails.default.url,
          playlistId: item.id,
          type: "Playlist"
        }))
      }));
  }
  throw new Error("Faked getPlaylistsForChannel is not supported yet");
};

const isItemSupported = (itemKind: ItemKind): boolean =>
  itemKind === "youtube#video" ||
  itemKind === "youtube#playlist" ||
  itemKind === "youtube#channel";

const parseItem = (item: ItemsItem): SearchItem => {
  if (item.id.kind === "youtube#video") return parseVideo(item);
  else if (item.id.kind === "youtube#playlist") return parsePlaylist(item);
  else return parseChannel(item);
};

const parseVideo = (item: ItemsItem): SearchItem => ({
  ...mapTitle(item.snippet),
  previewUrl: item.snippet.thumbnails.default.url,
  videoId: item.id.videoId as string,
  type: "Video"
});

const parsePlaylist = (item: ItemsItem): SearchItem => ({
  ...mapTitle(item.snippet),
  previewUrl: item.snippet.thumbnails.default.url,
  playlistId: item.id.playlistId as string,
  type: "Playlist"
});

const parseChannel = (item: ItemsItem): SearchItem => ({
  ...mapTitle(item.snippet),
  previewUrl: item.snippet.thumbnails.default.url,
  channelId: item.id.channelId as string,
  type: "Channel"
});

const mapTitle = ({ title }: { title: string }) => ({
  title: title
});

const logRequest = (term: string, requestType: string) => {
  console.log(`Requesting Youtube ${requestType} for ${term}`);
  return term;
};

const defaultProps = {
  key: YOUTUBE_KEY
};

const fetchJson = (url: string) => fetch(url).then(res => res.json());

const parseProps = (props: any): string => {
  const allProps = { ...props, ...defaultProps };
  return Object.keys(allProps)
    .filter(key => typeof allProps[key] !== "undefined")
    .map(key => `${key}=${allProps[key]}`)
    .join("&");
};
const url = (verb: string, props: {}) =>
  `https://www.googleapis.com/youtube/v3/${verb}?${parseProps(props)}`;
