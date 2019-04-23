import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import App from "./App";
import "jest-dom/extend-expect";

afterEach(cleanup);

describe("Havign a default button", () => {
  it("initial value should be zero", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("mylabel")).toHaveTextContent("0");
  });

  it("button should be yellow", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("mybutton")).toHaveClass("yellow");
  });
});

it("Clicking on a button should increment label by one and make it blue", () => {
  const { getByTestId } = render(<App />);

  fireEvent.click(getByTestId("mybutton"));

  expect(getByTestId("mylabel")).toHaveTextContent("1");
  expect(getByTestId("mybutton")).toHaveClass("blue");
});
