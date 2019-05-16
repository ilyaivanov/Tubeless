interface YoutubeVideo {
  title: string;
  videoId: string;
  previewUrl: string;
}

export interface YoutubeVideoResponse {
  videos: YoutubeVideo[];
}

export const searchVideos = (term: string): Promise<YoutubeVideoResponse> => {
  console.log("requesting outube api with term", term);
  return Promise.resolve({
    videos: [
      {
        title: "Carbon based Lifeforms",
        videoId: "f5ddAAYasgM",
        previewUrl: "https://picsum.photos/id/948/132/132?grayscale"
      }
    ]
  });
};
