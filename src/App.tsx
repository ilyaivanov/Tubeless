import React, { useState } from "react";
import { DragContext } from "./tree/dnd";
import { sampleNodes } from "./tree/sampleTrees";
import { Node, Placement, TreeInfo } from "./tree/types";
import Player from "./player";
import TreeUpdatesHandler from "./TreeUpdatesHandler";

interface Props {
  favoriteNodes?: string[];
}

const App: React.FC<Props> = ({ favoriteNodes }: any) => {
  const [nodes, setNodes] = useState(sampleNodes);
  const [placement, setPlacement] = useState({} as Partial<Placement>);

  const [favoritesRoots, setFavoritesRoots] = useState(
    favoriteNodes || ["1", "2"]
  );
  const [nodeBeingPlayed, setNodeBeingPlayer] = useState({} as Node);

  const favoritesTree = {
      nodes,
      roots: favoritesRoots
    } /*?*/;

  const updateFavorites = (tree: TreeInfo) => {
    setNodes(tree.nodes);
    setFavoritesRoots(tree.roots);
  };

  const searchTree = {
    nodes: nodes,
    roots: ["1"]
  };

  const onPlay = (node: Node) => setNodeBeingPlayer(node);

  return (
    <div>
      <DragContext>
        <LayoutManager
          renderRight={() => (
            <TreeUpdatesHandler
              placement={placement}
              setPlacement={setPlacement}
              tree={favoritesTree}
              setTree={updateFavorites}
              onPlay={onPlay}
            />
          )}
          renderLeft={() => (
            <TreeUpdatesHandler
              placement={placement}
              setPlacement={setPlacement}
              tree={searchTree}
              setTree={updateFavorites}
              onPlay={onPlay}
            />
          )}
        />
      </DragContext>
      <Player videoId={nodeBeingPlayed.videoUrl} />
    </div>
  );
};

const LayoutManager = ({ renderRight, renderLeft }: any) => {
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
          onClick={() => setSearchVisibility(!seachVisible)}
        />
        {seachVisible && renderLeft()}
      </div>

      <div style={{ flex: 1 }} data-testid="favorites-zone">
        {renderRight()}
      </div>
    </div>
  );
};

const Search = ({ isVisible, onClick }: any) => {
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
    </div>
  );
};

export default App;
