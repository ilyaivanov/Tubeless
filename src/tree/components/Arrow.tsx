import styled from "styled-components";
import React, { MouseEventHandler } from "react";
import { ARROW_SIZE } from "./constants";
import { NodeContainer } from "./NodeContainer";
import { Center } from "./Common";

type ArrowIconOrientation = "right" | "down";

interface ArrowProps {
  nodeId: string;
  onClick: MouseEventHandler;
  orientation: ArrowIconOrientation;
}

export const Arrow = (props: ArrowProps) => (
  <ArrowContainer onClick={props.onClick}>
    <ArrowIcon
      data-testid={"arrow-" + props.nodeId}
      orientation={props.orientation}
    />
  </ArrowContainer>
);

interface ArrowIconProps {
  orientation: ArrowIconOrientation;
}

const ArrowIcon = styled.div<ArrowIconProps>`
  width: 0;
  height: 0;
  border-style: solid;
  ${(props: ArrowIconProps) => getStyleForOrientation(props.orientation)};
  visibility: hidden;
  ${NodeContainer}:hover & {
    visibility: visible;
  }
`;

const ArrowContainer = styled(Center)`
  height: ${ARROW_SIZE}px;
  width: ${ARROW_SIZE}px;
  min-width: ${ARROW_SIZE}px;
`;

const getStyleForOrientation = (orientation: ArrowIconOrientation) => {
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
