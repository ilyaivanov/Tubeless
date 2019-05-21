import { YoutubeVideoResponse } from "./api";
import { Node } from "../tree/types";
import { createId } from "../utils";

export const mapVideosToNodes = (response: YoutubeVideoResponse): Node[] => {
  return response.videos.map(video => ({
    id: createId(),
    text: video.title,
    type: "video",
    videoUrl: video.videoId,
    imageUrl: video.previewUrl,
    isHidden: true
  }));
};
