import React from "react";
import { storiesOf } from "@storybook/react";
import { Node } from "../tree/Node";

storiesOf("Tree", module)
  .add("beautiful after", () => (
    <SampleTree beautifulArgs={{ isHighlightedAfter: true }} />
  ))
  .add("beautiful before", () => (
    <SampleTree beautifulArgs={{ isHighlightedBefore: true }} />
  ))
  .add("something after", () => (
    <SampleTree somethingArgs={{ isHighlightedAfter: true }} />
  ))
  .add("something before", () => (
    <SampleTree somethingArgs={{ isHighlightedBefore: true }} />
  ))
  .add("something before with shift -1", () => (
    <SampleTree
      somethingArgs={{ isHighlightedBefore: true, highlightShift: -1 }}
    />
  ))
  .add("beautiful after plus 1", () => (
    <SampleTree
      beautifulArgs={{ isHighlightedAfter: true, highlightShift: +1 }}
    />
  ))
  .add("beautiful after minus 1", () => (
    <SampleTree
      beautifulArgs={{ isHighlightedAfter: true, highlightShift: -1 }}
    />
  ));

const SampleTree = ({ beautifulArgs, somethingArgs }: any) => (
  <div>
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
  </div>
);
