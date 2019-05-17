import { YoutubeVideoResponse } from "../api";

export const searchFaked = (term: string): YoutubeVideoResponse => ({
  videos: [
    {
      title: "Carbon based Lifeforms 1 " + term,
      videoId: "f5ddAAYasgM",
      previewUrl: "https://picsum.photos/id/948/132/132?grayscale"
    },
    {
      title: "Carbon based Lifeforms 2 " + term,
      videoId: "f5ddAAYasgM",
      previewUrl: "https://picsum.photos/id/949/132/132?grayscale"
    },
    {
      title: "Carbon based Lifeforms 3 " + term,
      videoId: "f5ddAAYasgM",
      previewUrl: "https://picsum.photos/id/950/132/132?grayscale"
    },
    {
      title: "Carbon based Lifeforms 4 " + term,
      videoId: "f5ddAAYasgM",
      previewUrl: "https://picsum.photos/id/951/132/132?grayscale"
    }
  ]
});
