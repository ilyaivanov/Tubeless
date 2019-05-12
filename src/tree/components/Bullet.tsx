import styled from "styled-components";
import React, { Ref } from "react";

interface CircleProps {
  width: number;
  color: string;
  hoverColor?: string;
}

interface BulletProps {
  itemId: string;
}

export const Bullet = React.forwardRef(
  ({ itemId }: BulletProps, ref: Ref<HTMLDivElement>) => (
    <CircleContainer ref={ref} data-testid={"drag-handle-" + itemId}>
      <Circle
        width={18}
        color="rgb(220, 224, 226)"
        hoverColor={"rgb(183, 188, 191)"}
      >
        <Circle width={8} color="rgb(75, 81, 85)" />
      </Circle>
    </CircleContainer>
  )
);

const Circle = styled.div<CircleProps>`
  border-radius: 10px;
  width: ${(props: CircleProps) => `${props.width}px`};
  height: ${(props: CircleProps) => `${props.width}px`};
  background-color: ${(props: CircleProps) => `${props.color}`};
  ${(props: CircleProps) =>
    props.hoverColor
      ? `&:hover{
    background-color: ${props.hoverColor}
  }`
      : ""};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CircleContainer = styled.div`
  margin-right: 5px;
`;
