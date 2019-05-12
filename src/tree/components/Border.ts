import styled from "styled-components";
import {ARROW_SIZE, LEVEL_SHIFT} from "./constants";

export const Border = styled.div`
  height: 2px;
  background-color: grey;
  position: absolute;
  left: ${(props:any) => (ARROW_SIZE + props.placement.dragLevel * LEVEL_SHIFT)}px;
  right: 0;
  ${(props: any) =>
  props.placement.orientation === "AFTER" ? "bottom: -1px" : "top: -1px"};
` as any;
