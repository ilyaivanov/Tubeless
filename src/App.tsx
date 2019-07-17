import React, { Fragment, useEffect, useState } from "react";
import { DragContext } from "./tree/dnd";
import { sampleNodes } from "./tree/sampleTrees";
import { Node, Nodes, Placement, Roots } from "./tree/types";
import Player from "./player";
import { searchVideos, YoutubeResponse } from "./youtube/api";
import { shallowEqual, useDebounce } from "./utils";
import { onCreateNode, onSearchDone } from "./tree/treeActions";
import { mapVideosToNodes } from "./youtube/mapVideosToNodes";
import Tree from "./tree/Tree";
import { getNextNodeId } from "./tree/treeOperations";

interface Props {
  processDefaultNodes?: (nodes: Nodes) => Nodes;
}

const STORAGE_KEY = "nodes:v0.1";

const App: React.FC<Props> = ({ processDefaultNodes }) => {
  const [nodes, setNodes] = useState(
    processDefaultNodes ? processDefaultNodes(sampleNodes) : sampleNodes
  );
  const updateNodes = (nodes: Nodes) => {
    setNodes(nodes);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nodes));
  };

  useEffect(() => {
    const res = window.localStorage.getItem(STORAGE_KEY);
    if (res) {
      setNodes(JSON.parse(res));
    }
  }, []);

  const [placement, setPlacement] = useState({} as Partial<Placement>);

  const [nodeBeingPlayed, setNodeBeingPlayer] = useState({} as Node);

  const onPlay = (node: Node) => setNodeBeingPlayer(node);

  const setSearchNodes = (response: YoutubeResponse, override?: boolean) => {
    //TORO: remove this anti-pattern, do not set true flags for single method
    updateNodes(
      onSearchDone(
        nodes,
        Roots.SEARCH,
        mapVideosToNodes(response),
        response,
        override
      )
    );
  };

  const updatePlacementOptimized = (newPlacement: Partial<Placement>) => {
    if (!shallowEqual(newPlacement, placement)) {
      console.count("called set placement");
      setPlacement(newPlacement);
    }
  };

  const addNewNodeForFavorites = () =>
    updateNodes(onCreateNode(nodes, Roots.FAVORITES));

  const resetState = () => {
    setNodes(sampleNodes);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const playNextTrack = () => {
    const next = getNextNodeId(nodes, nodeBeingPlayed.id);
    if(next) {
      setNodeBeingPlayer(nodes[next]);
    }
  };

  return (
    <div>
      <DragContext>
        <LayoutManager
          searchNode={nodes[Roots.SEARCH]}
          onSearchDone={setSearchNodes}
          renderRight={() => (
            <Fragment>
              <Tree
                nodes={nodes}
                ids={nodes[Roots.FAVORITES].children as string[]}
                level={0}
                setPlacement={updatePlacementOptimized}
                setNodes={updateNodes}
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
              setNodes={updateNodes}
              placement={placement}
            />
          )}
        />
      </DragContext>
      <Player videoId={nodeBeingPlayed.videoUrl} onEnd={playNextTrack} />
      <button
        style={{ position: "absolute", top: 5, right: 5 }}
        onClick={resetState}
      >
        Reset
      </button>
    </div>
  );
};

const LayoutManager = ({
  renderRight,
  renderLeft,
  onSearchDone,
  searchNode
}: any) => {
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
          searchNode={searchNode}
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

const Search = ({
  searchNode,
  isVisible,
  onClick,
  renderTree,
  onSearchDone
}: any) => {
  const [value, setValue] = useState("");
  const throttledValue = useDebounce(value, 500);
  useEffect(() => {
    if (throttledValue) {
      searchVideos(throttledValue).then(res =>
        onSearchDone(res, true)
      );
    }
  }, [throttledValue]);

  const loadMoreSearch = () => {
    searchVideos(throttledValue, searchNode.nextPageToken).then(onSearchDone);
  };
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
        <Fragment>
          <input
            data-testid="search-input"
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
          />{" "}
          {searchNode.titlePostfix && (
            <span style={{ fontSize: 11, color: "grey" }}>
              {" "}
              {searchNode.titlePostfix}
            </span>
          )}
        </Fragment>
      )}
      {isVisible && renderTree()}
      {isVisible && <button onClick={loadMoreSearch}>more</button>}
    </div>
  );
};

export default App;
