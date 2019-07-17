import React, { useState } from "react";
import Youtube from "react-youtube";

interface Props {
  videoId?: string;
  onEnd: () => void;
}

const Player = ({ videoId, onEnd }: Props) => {
  const [player, setPlayer] = useState();

  if (!videoId) return null;

  return <YoutubePlayerWrapper onReady={setPlayer} videoId={videoId} onEnd={onEnd} />;
};

const YoutubePlayerWrapper = (props: any) => (
  <div style={style}>
    <Youtube
      {...props}
      onReady={e => props.onReady(e.target)}
      onEnd={props.onEnd}
      data-testid="player"
      opts={{
        height: "150",
        width: "400",
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1
        }
      }}
    />
  </div>
);

const style = {
  position: "fixed",
  right: 15,
  bottom: 15
} as {};

export default Player;
