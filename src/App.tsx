import React, { useState, useRef, useEffect } from "react";
import { DragContext } from "./tree/dnd";
import { sampleNodes } from "./tree/sampleTrees";
import { Node, Nodes, Placement, Roots } from "./tree/types";
import Player from "./player";
import TreeUpdatesHandler from "./TreeUpdatesHandler";
import { searchVideos, YoutubeVideoResponse } from "./youtube/api";
import { useThrottle } from "./hooks";
import { createId, updateNode, createNode } from "./domain/nodes.utils";

interface Props {
  processDefaultNodes?: (nodes: Nodes) => Nodes;
}

const App: React.FC<Props> = ({ processDefaultNodes }) => {
  const [nodes, setNodes] = useState(
    processDefaultNodes ? processDefaultNodes(sampleNodes) : sampleNodes
  );
  const [placement, setPlacement] = useState({} as Partial<Placement>);

  const [nodeBeingPlayed, setNodeBeingPlayer] = useState({} as Node);

  const onPlay = (node: Node) => setNodeBeingPlayer(node);

  const setSearchNodes = (videoNodes: YoutubeVideoResponse) => {
    const children = videoNodes.videos.map(() => createId());
    const some = updateNode(nodes, Roots.SEARCH, () => ({ children }));

    const res = videoNodes.videos.reduce((state, video, index) => {
      return createNode(state, {
        text: video.title,
        id: children[index],
        type: "video",
        videoUrl: video.videoId,
        imageUrl: video.previewUrl,
        isHidden: true
      });
    }, some);
    setNodes(res);
  };

  return (
    <div>
      <DragContext>
        <LayoutManager
          onSearchDone={setSearchNodes}
          renderRight={() => (
            <TreeUpdatesHandler
              zone={Roots.FAVORITES}
              placement={placement}
              setPlacement={setPlacement}
              nodes={nodes}
              setNodes={setNodes}
              onPlay={onPlay}
            />
          )}
          renderLeft={() => (
            <TreeUpdatesHandler
              zone={Roots.SEARCH}
              placement={placement}
              setPlacement={setPlacement}
              nodes={nodes}
              setNodes={setNodes}
              onPlay={onPlay}
            />
          )}
        />
      </DragContext>
      <Player videoId={nodeBeingPlayed.videoUrl} />
    </div>
  );
};

const LayoutManager = ({ renderRight, renderLeft, onSearchDone }: any) => {
  const [seachVisible, setSearchVisibility] = useState(false);
  const style = seachVisible
    ? { flex: 1 }
    : { width: 40, backgroundColor: "lightGrey" };
  return (
    <div
      style={{
        flexDirection: "row",
        display: "flex",
        alignItems: "stretch",
        height: "100vh"
      }}
    >
      <div style={style} data-testid="search-zone">
        <Search
          isVisible={seachVisible}
          onSearchDone={onSearchDone}
          onClick={() => setSearchVisibility(!seachVisible)}
          renderTree={renderLeft}
        />
      </div>

      <div style={{ flex: 1 }} data-testid="favorites-zone">
        {renderRight()}
      </div>
    </div>
  );
};

const Search = ({ isVisible, onClick, renderTree, onSearchDone }: any) => {
  const [value, setValue] = useState("");
  //TODO: consider another implementation of useThrottle
  //it has a redundant initial fire
  const throttledValue = useThrottle(value, 4000);
  useEffect(() => {
    if (throttledValue) searchVideos(throttledValue).then(onSearchDone);
  }, [throttledValue]);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: isVisible ? "flex-end" : "center",
          paddingRight: isVisible ? 20 : 0
        }}
      >
        <button data-testid="toggle-sidebar" onClick={onClick}>
          {isVisible ? "<" : "+"}
        </button>
      </div>
      {isVisible && (
        <input
          data-testid="search-input"
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      )}
      {isVisible && renderTree()}
    </div>
  );
};

export default App;
