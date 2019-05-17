import { SearchResponse } from "./types/searchResponse";
import { YOUTUBE_KEY } from "../keys";
import { IS_REAL_API } from "../featureToggles";
import { searchFaked } from "./types/fakedResponses";

interface YoutubeVideo {
  title: string;
  videoId: string;
  previewUrl: string;
}

export interface YoutubeVideoResponse {
  videos: YoutubeVideo[];
}

export const searchVideos = (term: string): Promise<YoutubeVideoResponse> =>
  IS_REAL_API
    ? fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&shart=mostPopular&maxResults=10&key=${YOUTUBE_KEY}&q=` +
          logRequest(term)
      )
        .then(response => response.json())
        .then((data: SearchResponse) => ({
          videos: data.items
            .filter(v => v.id.videoId)
            .map(s => ({
              title: s.snippet.title,
              videoId: s.id.videoId,
              previewUrl: s.snippet.thumbnails.default.url
            }))
        }))
    : Promise.resolve(searchFaked(term));

// export const searchSimilar = (videoId: string): Promise<YoutubeVideoResponse> =>
//   fetch(
//     `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${YOUTUBE_KEY}&relatedToVideoId=` +
//     videoId
//   )
//     .then(response => response.json())
//     .then((data: SimilarResponse) =>
//       data.items
//         .filter(v => v.id.videoId)
//         .map(s => {
//           return {text: s.snippet.title, id: s.id.videoId};
//         })
//     );

const logRequest = (term: string) => {
  console.log("Requesting Youtube for ", term);
  return term;
};
