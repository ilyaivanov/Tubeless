import React, { useEffect, useState } from "react";
import Youtube from "react-youtube";

interface Props {
  videoId?: string;
}

const Player = ({ videoId }: Props) => {
  const [player, setPlayer] = useState();

  const visible = true;
  if (!videoId) return null;

  // useEffect(() => {
  //   if (player) {
  //     player.playVideo();
  //   }
  // }, [player]);

  const opts: any = {
    height: 150,
    width: 220,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };
  return (
    <div
      style={{
        position: "absolute",
        right: 15,
        bottom: 15,
        display: visible ? undefined : "none"
      }}
    >
      <YoutubePlayerWrapper onReady={setPlayer} videoId={videoId} opts={opts} />
    </div>
  );
};

const YoutubePlayerWrapper = React.memo((props: any) => (
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
));

export default Player;
