import React from "react";
import { storiesOf } from "@storybook/react";
import Node from "../tree/Node";
import DragDropContext from "../tree/DragDropContext";

storiesOf("Dragging Tree", module).add("dragafter", () => <SampleTree />);

const SampleTree = ({ beautifulArgs, somethingArgs }) => (
  <div>
    <DragDropContext>
      <Node text="Item 1">
        <Node text="Something" {...somethingArgs}>
          <Node text="beautiful" {...beautifulArgs} />
        </Node>
        <Node text="and available">
          <Node text="only via" />
          <Node text="keyboard" />
        </Node>
      </Node>
      <Node text="goo" />
      <Node text="Item 2" />
    </DragDropContext>
  </div>
);
