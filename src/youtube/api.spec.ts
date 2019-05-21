import { YoutubeSearchResponse } from "./types/youtubeSearchResponse";
import { ItemType, SearchResponse, searchVideos } from "./api";

jest.mock("../featureToggles", () => ({
  IS_REAL_API: true
}));

it("having a mixed respones from youtube with videos/playlists/channels", () => {
  // @ts-ignore
  fetch = () => Promise.resolve({ json: () => mixedResponse });

  const expectedItems: SearchResponse = {
    items: [
      {
        title: "Jordan B Peterson",
        previewUrl:
          "https://yt3.ggpht.com/-Ky9Z-C4HTEI/AAAAAAAAAAI/AAAAAAAAAAA/CAZTfGncRhI/s88-c-k-no-mo-rj-c0xffffff/photo.jpg",
        type: "Channel",
        channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q"
      },
      {
        title: "Farenheit Project",
        previewUrl: "https://i.ytimg.com/vi/bgFhiM6m3sc/default.jpg",
        type: "Playlist",
        playlistId: "PL28E753C95B8D18CF"
      },
      {
        title: "Milo: Forbidden Conversation",
        previewUrl: "https://i.ytimg.com/vi/FHpvI8oGsuQ/default.jpg",
        type: "Video",
        videoId: "FHpvI8oGsuQ"
      }
    ]
  };

  return searchVideos("sample").then(videos => {
    expect(videos).toEqual(expectedItems);
  });
});

const mixedResponse: YoutubeSearchResponse = {
  kind: "youtube#searchListResponse",
  etag: '"XpPGQXPnxQJhLgs6enD_n8JR4Qk/EuxPx3QNDbPiLxxdPhiiGKurEqA"',
  nextPageToken: "CAoQAA",
  regionCode: "UA",
  pageInfo: {
    totalResults: 1000000,
    resultsPerPage: 10
  },
  items: [
    {
      kind: "youtube#searchResult",
      etag: '"XpPGQXPnxQJhLgs6enD_n8JR4Qk/SjCBMQhuwgfVrjSIqyCaj3509pw"',
      id: {
        kind: "youtube#channel",
        channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q"
      },
      snippet: {
        publishedAt: "2013-03-30T02:56:38.000Z",
        channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
        title: "Jordan B Peterson",
        description:
          "Support this channel at jordanbpeterson.com/donate/ Instead of emailing Dr. Peterson, please consider posting your letter to his subreddit: ...",
        thumbnails: {
          default: {
            url:
              "https://yt3.ggpht.com/-Ky9Z-C4HTEI/AAAAAAAAAAI/AAAAAAAAAAA/CAZTfGncRhI/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
          },
          medium: {
            url:
              "https://yt3.ggpht.com/-Ky9Z-C4HTEI/AAAAAAAAAAI/AAAAAAAAAAA/CAZTfGncRhI/s240-c-k-no-mo-rj-c0xffffff/photo.jpg"
          },
          high: {
            url:
              "https://yt3.ggpht.com/-Ky9Z-C4HTEI/AAAAAAAAAAI/AAAAAAAAAAA/CAZTfGncRhI/s800-c-k-no-mo-rj-c0xffffff/photo.jpg"
          }
        },
        channelTitle: "Jordan B Peterson",
        liveBroadcastContent: "upcoming"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"XpPGQXPnxQJhLgs6enD_n8JR4Qk/M1-Irpl4rkbxxqzSyJvRB7njWWo"',
      id: {
        kind: "youtube#playlist",
        playlistId: "PL28E753C95B8D18CF"
      },
      snippet: {
        publishedAt: "2012-01-30T22:48:31.000Z",
        channelId: "UCv4JkDA477lfKLFDm0Q4J-w",
        title: "Farenheit Project",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/bgFhiM6m3sc/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/bgFhiM6m3sc/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/bgFhiM6m3sc/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "Robert Manea",
        liveBroadcastContent: "none"
      }
    },
    {
      kind: "youtube#searchResult",
      etag: '"XpPGQXPnxQJhLgs6enD_n8JR4Qk/x-Nt353eEJXdL6SR53iCcyTtMtk"',
      id: {
        kind: "youtube#video",
        videoId: "FHpvI8oGsuQ"
      },
      snippet: {
        publishedAt: "2019-05-20T22:19:19.000Z",
        channelId: "UCL_f53ZEJxp8TtlOkHwMV9Q",
        title: "Milo: Forbidden Conversation",
        description:
          "Podcast available at http://bit.ly/2EkTOhg I should start by saying that Milo is definitely now on the list of those who no one acceptable socially should ever speak ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/FHpvI8oGsuQ/default.jpg",
            width: 120,
            height: 90
          },
          medium: {
            url: "https://i.ytimg.com/vi/FHpvI8oGsuQ/mqdefault.jpg",
            width: 320,
            height: 180
          },
          high: {
            url: "https://i.ytimg.com/vi/FHpvI8oGsuQ/hqdefault.jpg",
            width: 480,
            height: 360
          }
        },
        channelTitle: "Jordan B Peterson",
        liveBroadcastContent: "none"
      }
    }
  ]
};
