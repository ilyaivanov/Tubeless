// @ts-ignore
import styled from "styled-components";
import {
  bulletMargin,
  extraVerticalSpaceForChildren,
  itemHeight,
  itemMargin,
  marginOffset,
  plusHeight,
  borderWidth,
  highlighHeight,
  circleWidth,
  halfCircle
} from "../constants";

export const AddNewNodeItem = styled.div`
  position: absolute;
  bottom: ${itemHeight / 2 - plusHeight / 2 + extraVerticalSpaceForChildren}px;
  left: -${plusHeight / 2 + borderWidth}px;
  width: ${plusHeight}px;
  height: ${plusHeight}px;
  &:hover {
    background-color: black;
  }
`;

export const Highlighted = styled.div`
  margin-left: ${props =>
    marginOffset +
    (props.relativeShift
      ? props.relativeShift * (itemMargin + bulletMargin)
      : 0)}px;
  position: absolute;
  left: 0;
  right: 0;
  height: ${highlighHeight}px;
  background-color: grey;
  ${props =>
    props.highlightPlacement === "PLACE_AFTER" &&
    `bottom: ${-highlighHeight / 2}px`}
  ${props =>
    props.highlightPlacement === "PLACE_BEFORE" &&
    `top: ${-highlighHeight / 2}px`}
`;

export const Bullet = styled.div`
  height: ${circleWidth}px;
  width: ${circleWidth}px;
  background-color: grey;
  border-radius: ${circleWidth}px;
  margin-left: ${bulletMargin}px;
  margin-right: ${bulletMargin}px;
  ${props => props.isDragging && `transform: scale(0);`}
  ${props =>
    !props.isDragging &&
    `&:hover {
    transform: scale(1.8);
  }`}
`;

export const ChildrenSpace = styled.div`
  position: relative;
  border-left: solid black 1px;
  padding-top: ${extraVerticalSpaceForChildren}px;
  margin-left: ${halfCircle + bulletMargin}px;
  margin-top: ${-extraVerticalSpaceForChildren}px;
  margin-bottom: ${-extraVerticalSpaceForChildren}px;
  padding-bottom: ${extraVerticalSpaceForChildren}px;
`;

export const NodeContainer = styled.div`
  padding-left: ${itemMargin - halfCircle}px;
`;

export const NodeHeader = styled.div`
  margin-left: ${-marginOffset}px;
  padding-left: ${marginOffset}px;
  height: ${itemHeight}px;
  align-items: center;
  display: flex;
  position: relative;
`;
