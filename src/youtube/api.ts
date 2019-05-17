import { SearchResponse } from "./types/searchResponse";
import { SimilarResponse } from "./types/similarResponse";
import { YOUTUBE_KEY } from "../keys";

interface YoutubeVideo {
  title: string;
  videoId: string;
  previewUrl: string;
}

export interface YoutubeVideoResponse {
  videos: YoutubeVideo[];
}

// export const searchVideos = (term: string): Promise<YoutubeVideoResponse> => {
//   console.log("requesting outube api with term", term);
//   return Promise.resolve({
//     videos: [
//       {
//         title: "Carbon based Lifeforms",
//         videoId: "f5ddAAYasgM",
//         previewUrl: "https://picsum.photos/id/948/132/132?grayscale"
//       }
//     ]
//   });
// };

export const searchVideos = (term: string): Promise<YoutubeVideoResponse> =>
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&shart=mostPopular&maxResults=10&key=${YOUTUBE_KEY}&q=` +
      term
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
    }));

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
