import React from "react";
import { storiesOf } from "@storybook/react";
import Node from "../tree/Node";

import './tree-drag';
import DragDropContext from '../tree/DragDropContext';

storiesOf("Tree", module)
  .add("beautiful after", () => (
    <SampleTree beautifulArgs={{ highlightPlacement: 'PLACE_AFTER' }} />
  ))
  .add("beautiful before", () => (
    <SampleTree beautifulArgs={{ highlightPlacement: 'PLACE_BEFORE' }} />
  ))
  .add("something after", () => (
    <SampleTree somethingArgs={{ highlightPlacement: 'PLACE_AFTER' }} />
  ))
  .add("something before", () => (
    <SampleTree somethingArgs={{ highlightPlacement: 'PLACE_BEFORE' }} />
  ))
  .add("something before with shift -1", () => (
    <SampleTree
      somethingArgs={{ highlightPlacement: 'PLACE_BEFORE', highlightShift: -1 }}
    />
  ))
  .add("beautiful after plus 1", () => (
    <SampleTree
      beautifulArgs={{ highlightPlacement: 'PLACE_AFTER', highlightShift: +1 }}
    />
  ))
  .add("beautiful after minus 1", () => (
    <SampleTree
      beautifulArgs={{ highlightPlacement: 'PLACE_AFTER', highlightShift: -1 }}
    />
  ));

const SampleTree = ({ beautifulArgs, somethingArgs }) => (
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
);
