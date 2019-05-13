import React, { useEffect, useState } from "react";
import Youtube from "react-youtube";

interface Props {
  videoId?: string;
}

const Player = ({ videoId }: Props) => {
  const [player, setPlayer] = useState();

  // useEffect(() => {
  //   if (player) {
  //     console.log("playing video");
  //     player.playVideo();
  //   }
  // }, [player]);

  if (!videoId) return null;

  return <YoutubePlayerWrapper onReady={setPlayer} videoId={videoId} />;
};

const YoutubePlayerWrapper = (props: any) => (
  <div style={style}>
    <Youtube
      {...props}
      onReady={e => props.onReady(e.target)}
      data-testid="player"
      opts={{
        height: "150",
        width: "220",
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1
        }
      }}
    />
  </div>
);

const style = {
  position: "absolute",
  right: 15,
  bottom: 15
} as {};

export default Player;
