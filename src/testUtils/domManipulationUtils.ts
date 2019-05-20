import { RenderResult, fireEvent } from "react-testing-library";

export const clickOnArrow = (page: RenderResult, nodeId: string) =>
  fireEvent.click(page.getByTestId(getArrowId(nodeId)));

const getArrowId = (nodeId: string) => "arrow-" + nodeId;
