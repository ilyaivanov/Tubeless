import React, { Fragment, useEffect, useState } from "react";
import { DragContext } from "./tree/dnd";
import { sampleNodes } from "./tree/sampleTrees";
import { Node, Nodes, Placement, Roots } from "./tree/types";
import Player from "./player";
import {
  searchVideos,
  YoutubeVideoResponse
} from "./youtube/api";
import { shallowEqual, useDebounce } from "./utils";
import {
  onCreateNode,
  onSearchDone,
} from "./tree/treeActions";
import { mapVideosToNodes } from "./youtube/mapVideosToNodes";
import Tree from "./tree/Tree";

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

  const setSearchNodes = (response: YoutubeVideoResponse) => {
    setNodes(onSearchDone(nodes, Roots.SEARCH, mapVideosToNodes(response)));
  };

  const updatePlacementOptimized = (newPlacement: Partial<Placement>) => {
    if (!shallowEqual(newPlacement, placement)) {
      console.count("called set placement");
      setPlacement(newPlacement);
    }
  };

  const addNewNodeForFavorites = () =>
    setNodes(onCreateNode(nodes, Roots.FAVORITES));

  return (
    <div>
      <DragContext>
        <LayoutManager
          onSearchDone={setSearchNodes}
          renderRight={() => (
            <Fragment>
              <Tree
                nodes={nodes}
                ids={nodes[Roots.FAVORITES].children as string[]}
                level={0}
                setPlacement={updatePlacementOptimized}
                setNodes={setNodes}
                onPlay={onPlay}
                placement={placement}
              />
              <button
                data-testid="add-new-node"
                onClick={addNewNodeForFavorites}
              >
                add
              </button>
            </Fragment>
          )}
          renderLeft={() => (
            <Tree
              nodes={nodes}
              ids={nodes[Roots.SEARCH].children as string[]}
              level={0}
              onPlay={onPlay}
              setPlacement={updatePlacementOptimized}
              setNodes={setNodes}
              placement={placement}
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
  const throttledValue = useDebounce(value, 500);
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
