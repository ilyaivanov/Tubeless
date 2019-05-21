import {
  ItemKind,
  ItemsItem,
  YoutubeSearchResponse
} from "./types/youtubeSearchResponse";
import { YOUTUBE_KEY } from "../keys";
import { IS_REAL_API } from "../featureToggles";
import { searchFaked } from "./types/fakedResponses";
import { SimilarResponse } from "./types/similarResponse";

export type ItemType = "Video" | "Channel" | "Playlist";

interface Item {
  title: string;
  previewUrl: string;
}

interface VideoItem extends Item {
  type: 'Video';
  videoId: string;
}

interface ChannelItem extends Item {
  type: 'Channel';
  channelId: string;
}

interface PlaylistItem extends Item {
  type: 'Playlist';
  playlistId: string;
}

export type SearchItem = VideoItem | ChannelItem | PlaylistItem;

export interface SearchResponse {
  items: SearchItem[];
}

export const searchVideos = (term: string): Promise<SearchResponse> =>
  IS_REAL_API
    ? fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&shart=mostPopular&maxResults=10&key=${YOUTUBE_KEY}&q=` +
          logRequest(term)
      )
        .then(response => response.json())
        .then((data: YoutubeSearchResponse) => ({
          items: data.items
            .filter(item => isItemSupported(item.id.kind))
            .map(parseItem)
        }))
    : Promise.resolve(searchFaked(term));

export const searchSimilar = (videoId: string): Promise<SearchResponse> =>
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${YOUTUBE_KEY}&relatedToVideoId=` +
      videoId
  )
    .then(response => response.json())
    .then((data: SimilarResponse) => ({
      items: data.items
        .filter(v => v.id.videoId)
        .map(s => ({
          title: s.snippet.title,
          type: 'Video',
          videoId: s.id.videoId,
          previewUrl: s.snippet.thumbnails.default.url
        }))
    }));

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
  ...generalPart(item),
  videoId: item.id.videoId as string,
  type: "Video"
});

const parsePlaylist = (item: ItemsItem): SearchItem => ({
  ...generalPart(item),
  playlistId: item.id.playlistId as string,
  type: "Playlist"
});

const parseChannel = (item: ItemsItem): SearchItem => ({
  ...generalPart(item),
  channelId: item.id.channelId as string,
  type: "Channel"
});

const generalPart = (item: ItemsItem) => ({
  title: item.snippet.title,
  previewUrl: item.snippet.thumbnails.default.url
});

const logRequest = (term: string) => {
  console.log("Requesting Youtube for ", term);
  return term;
};
