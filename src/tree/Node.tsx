import styled from "styled-components";
import React from "react";

const borderWidth = 1;
const itemMargin = 35;
const circleWidth = 9;
const halfCircle = circleWidth / 2;
const itemHeight = 40;
const plusHeight = 15;
const extraVerticalSpaceForChildren = 0;
const marginOffset = 500;

interface Props {
  text: string;
  style?: any;
  children?: any;
  isHighlightedAfter?: boolean;
  isHighlightedBefore?: boolean;
  highlightShift?: number;
}

export const Node = ({
  text,
  style,
  children,
  isHighlightedAfter,
  isHighlightedBefore,
  highlightShift
}: Props) => (
  <div
    style={{
      paddingLeft: itemMargin - halfCircle,
      ...style
    }}
  >
    <div
      style={{
        marginLeft: -marginOffset,
        paddingLeft: marginOffset,
        height: itemHeight,
        alignItems: "center",
        display: "flex",
        position: "relative"
      }}
    >
      {(isHighlightedAfter || isHighlightedBefore) && (
        <Highlighted
          isHighlightedAfter={isHighlightedAfter}
          isHighlightedBefore={isHighlightedBefore}
          highlightShift={highlightShift}
        />
      )}
      <Bullet />
      <span style={{ marginLeft: 10 }}>{text}</span>
    </div>
    {children && <ChildrenSpace>{children}</ChildrenSpace>}
  </div>
);

const ChildrenSpace = ({ children }: any) => (
  <div
    style={{
      borderLeft: "solid black 1px",
      marginLeft: halfCircle,
      marginTop: -extraVerticalSpaceForChildren,
      paddingTop: extraVerticalSpaceForChildren,
      marginBottom: -extraVerticalSpaceForChildren,
      paddingBottom: extraVerticalSpaceForChildren,
      position: "relative"
    }}
  >
    {children}
    <div
      style={{
        position: "absolute",
        bottom: itemHeight / 2 - plusHeight / 2 + extraVerticalSpaceForChildren,
        left: -plusHeight / 2 - borderWidth / 2,
        width: plusHeight,
        height: plusHeight,
        backgroundColor: "#FFee00"
      }}
    />
  </div>
);

const highlighHeight = 5;

const Highlighted: any = styled.div`
  margin-left: ${(props: any) =>
    marginOffset + (props.highlightShift
      ? props.highlightShift * itemMargin
      : 0)}px;
  position: absolute;
  left: 0;
  right: 0;

  height: ${highlighHeight}px;
  background-color: grey;
  ${(props: any) =>
    props.isHighlightedAfter && `bottom: ${-highlighHeight / 2}px`}
  ${(props: any) =>
    props.isHighlightedBefore && `top: ${-highlighHeight / 2}px`}
`;

const Bullet = styled.div`
  height: ${circleWidth}px;
  width: ${circleWidth}px;
  background-color: grey;
  border-radius: ${circleWidth}px;

  &:hover {
    transform: scale(1.8);
  }
`;
