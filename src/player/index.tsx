import React, { useEffect, useState } from "react";
import Youtube from "react-youtube";

interface Props {
  videoId?: string;
}

const Player = ({ videoId }: Props) => {
  const [player, setPlayer] = useState();

  if (!videoId) return null;

  // useEffect(() => {
  //   if (player) {
  //     player.playVideo();
  //   }
  // }, [player]);

  return <YoutubePlayerWrapper onReady={setPlayer} videoId={videoId} />;
};

const YoutubePlayerWrapper = React.memo((props: any) => (
  <div style={getStyle(props.visible)}>
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
));

const getStyle = (visible: boolean) =>
  ({
    position: "absolute",
    right: 15,
    bottom: 15,
    display: visible ? undefined : "none"
  } as {});

export default Player;
