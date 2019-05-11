import React from "react";
import { render } from "react-testing-library";
import App from "./App";

it("App should render without any errors", () => {
  render(<App/>)
});
