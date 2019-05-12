import React from "react";
import styled from "styled-components";

export const ARROW_SIZE = 15;

export const LEVEL_SHIFT = 20;

export const CircleContainer = styled.div`
  margin-right: 5px;
` as any;

export const Circle = styled.div`
  border-radius: 10px;
  width: ${(props: any) => `${props.width}px`};
  height: ${(props: any) => `${props.width}px`};
  background-color: ${(props: any) => `${props.color}`};
  ${(props: any) =>
    props.hoverColor
      ? `&:hover{
    background-color: ${props.hoverColor}
  }`
      : ""};

  display: flex;
  justify-content: center;
  align-items: center;
` as any;

export const NodeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 24px;
  padding-left: ${(props: any) => props.level * LEVEL_SHIFT}px;
` as any;

export const Text = styled.span``;

export const Border = styled.div`
  height: 2px;
  background-color: grey;
  position: absolute;
  left: ${(props:any) => (ARROW_SIZE + props.placement.dragLevel * LEVEL_SHIFT)}px;
  right: 0;
  ${(props: any) =>
    props.placement.orientation === "AFTER" ? "bottom: -1px" : "top: -1px"};
` as any;

export const Arrow = (props: any) => (
  <ArrowContainer data-testid="arrow" onClick={props.onClick}>
    <ArrowP orientation={props.orientation} />
  </ArrowContainer>
);

export const ArrowP = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  ${(props: any) => getStyleForOrientation(props.orientation)};
  visibility: hidden;
  ${NodeContainer}:hover & {
    visibility: visible;
  }
` as any;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ArrowContainer = styled(Center)`
  height: ${ARROW_SIZE}px;
  width: ${ARROW_SIZE}px;
`;

const getStyleForOrientation = (orientation: "right" | "down") => {
  const width = 8;
  const side = width / 2;
  const smallSide = (side * 1.73205).toFixed(1);
  const color = "rgb(75, 81, 85)";
  if (orientation === "right") {
    return `
    border-width: ${side}px 0 ${side}px ${smallSide}px;
    border-color: transparent transparent transparent ${color};
  `;
  } else
    return `  
    border-width: ${smallSide}px ${side}px 0 ${side}px;
    border-color: ${color} transparent transparent transparent;
    `;
};
