import React, { useState } from "react";
import { DragContext } from "./tree/dnd";
import { sampleNodes } from "./tree/sampleTrees";
import {Node, Nodes, Placement, Roots} from "./tree/types";
import Player from "./player";
import TreeUpdatesHandler from "./TreeUpdatesHandler";

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

  return (
    <div>
      <DragContext>
        <LayoutManager
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
