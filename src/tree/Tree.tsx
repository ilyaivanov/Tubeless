import React, {Fragment, useState} from "react";
import {canDragOver, convertPlacement} from "./rules";
import {createInitialNodes} from "./nodes";
import Node from "./Node";
import DragDropContext from "./DragDropContext";
import {NodeType, Placement, Tree} from "./types";

export default ({tree}: { tree: Tree }) => {
  const [placement, setPlacement] = useState({
    id: ""
  });

  const updatePlacement = (newPlacement: Placement) => {
    console.log(newPlacement, canDragOver(tree.nodes, newPlacement));
    if (canDragOver(tree.nodes, newPlacement)) {
      setPlacement(convertPlacement(tree.nodes, newPlacement));
    }
  };

  return (
    <div>
      <DragDropContext>
        <TreeUI
          tree={createInitialNodes()}
          nodes={tree.roots}
          placement={placement}
          setPlacement={updatePlacement}
        />
      </DragDropContext>
    </div>
  );
};

const TreeUI = ({tree, nodes, placement, level = 1, setPlacement}: any) => {
  return (
    <Fragment>
      {nodes.map((id: string) => (
        // @ts-ignore
        <Node
          id={id}
          key={id}
          text={tree[id].text}
          level={level}
          setPlacement={setPlacement}
          {...getPlacementProps(tree[id], placement)}
        >
          {tree[id].children && (
            <TreeUI
              tree={tree}
              nodes={tree[id].children}
              placement={placement}
              level={level + 1}
              setPlacement={setPlacement}
            />
          )}
        </Node>
      ))}
    </Fragment>
  );
};

const getPlacementProps = (node: NodeType, placement: Placement) => {
  if (node.id !== placement.id) return undefined;
  return placement;
};
