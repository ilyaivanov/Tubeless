import React from "react";
import styled from "styled-components";

export const CircleContainer = styled.div`
  margin-left: 2px;
  margin-right: 5px;
`;

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
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 24px;
  margin-left: ${(props: any) => props.level * 20}px;
` as any;

export const Text = styled.span``;

const getStyleForOrientation = (orientation: "right" | "down") => {
  const width = 8;
  const side = width / 2;
  const smallSide = (side * 1.73205).toFixed(1);
  const color = "rgb(75, 81, 85)";
  if (orientation === "down") {
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

export const Arrow = (props: any) => (
  <div
    data-testid="arrow"
    onClick={props.onClick}
    style={{
      height: 15,
      width: 15,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <ArrowP orientation={props.orientation} />
  </div>
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
