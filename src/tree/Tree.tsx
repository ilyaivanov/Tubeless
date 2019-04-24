import React, { Fragment, useState } from "react";
import { canDragOver, convertPlacement, areEqualShallow } from "./rules";
import { createInitialNodes } from "./nodes";
import Node from "./Node";
import DragDropContext from "./DragDropContext";
import { NodeType, Placement, Tree } from "./types";

export default ({ tree }: { tree: Tree }) => {
  const [placement, setPlacement] = useState({
    id: ""
  });

  const updatePlacement = (newPlacement: Placement) => {
    if (canDragOver(tree.nodes, newPlacement)) {
      const converted = convertPlacement(tree.nodes, newPlacement);
      if (!areEqualShallow(converted, placement)) {
        setPlacement(converted);
      }
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

const TreeUI = ({ tree, nodes, placement, level = 1, setPlacement }: any) => {
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
