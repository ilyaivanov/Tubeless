import React, { useState } from "react";
import { DragContext } from "./tree/dnd";
import { sampleNodes } from "./tree/sampleTrees";
import { Node, TreeInfo } from "./tree/types";
import Player from "./player";
import TreeUpdatesHandler from "./TreeUpdatesHandler";
import { getRoots } from "./domain/dropRules";

const App: React.FC = () => {
  const [nodes, setNodes] = useState(sampleNodes.nodes);
  const [favoritesRoots, setFavoritesRoots] = useState(
    getRoots(sampleNodes.nodes)
  );
  const [nodeBeingPlayed, setNodeBeingPlayer] = useState({} as Node);

  const favoritesTree = {
    nodes,
    roots: favoritesRoots
  };
  const updateFavorites = (tree: TreeInfo) => {
    setNodes(tree.nodes);
    setFavoritesRoots(tree.roots);
  };

  const onPlay = (node: Node) => setNodeBeingPlayer(node);

  return (
    <div>
      <DragContext>
        <LayoutManager
          renderRight={() => (
            <TreeUpdatesHandler
              tree={favoritesTree}
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

const LayoutManager = ({ renderRight }: any) => {
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
      <div style={style}>
        <Search
          isVisible={seachVisible}
          onClick={() => setSearchVisibility(!seachVisible)}
        />
      </div>

      <div style={{ flex: 1 }}>{renderRight()}</div>
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
        <button onClick={onClick}>{isVisible ? "<" : "+"}</button>
      </div>
    </div>
  );
};

export default App;
