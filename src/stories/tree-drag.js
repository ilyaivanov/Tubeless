import React, { Fragment, useState } from "react";
import { storiesOf } from "@storybook/react";
import Node from "../tree/Node";
import DragDropContext from "../tree/DragDropContext";
import { canDragOver, convertPlacement } from "../tree/rules";

storiesOf("Dragging Tree", module).add("dragafter", () => <SampleTree />);

const node = (text, children) => ({
  text,
  id: text,
  children
});

const SampleTree = () => {
  const [placement, setPlacement] = useState({
    id: ""
  });

  const updatePlacement = newPlacement => {
    console.log(newPlacement, canDragOver(nodes, newPlacement));
    if (canDragOver(nodes, newPlacement)) {
      setPlacement(convertPlacement(nodes, newPlacement));
    }
  };

  const nodes = [
    node("Item 1", [
      node("Item 1.1"),
      node("Item 1.2", [node("Item 1.2.1")]),
      node("Item 1.3")
    ]),
    node("Item 2"),
    node("Item 3")
  ];

  return (
    <div>
      <DragDropContext>
        <Tree
          nodes={nodes}
          placement={placement}
          setPlacement={updatePlacement}
        />
      </DragDropContext>
    </div>
  );
};

const Tree = ({ nodes, placement, level = 1, setPlacement }) => {
  return (
    <Fragment>
      {nodes.map(n => (
        <Node
          setPlacement={setPlacement}
          key={n.text}
          text={n.text}
          {...getPlacementProps(n, placement)}
          level={level}
        >
          {n.children && (
            <Tree
              nodes={n.children}
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

const getPlacementProps = (node, placement) => {
  if (node.id !== placement.id) return undefined;
  return placement;
};
