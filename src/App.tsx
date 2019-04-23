import React, { Fragment, useState } from "react";
import "./App.css";

const App = () => {
  const [counter, setCounter] = useState(0);
  return (
    <Fragment>
      <div data-testid="mylabel" className="counter-label">
        {counter}
      </div>
      <MyButton
        onPress={() => setCounter(counter + 1)}
        isEven={counter % 2 === 0}
      />
    </Fragment>
  );
};

interface Props {
  onPress: () => void;
  isEven: boolean;
}

export const MyButton = ({ onPress, isEven }: Props) => (
  <button
    data-testid="mybutton"
    className={["main-button", isEven ? "yellow" : "blue"].join(" ")}
    onClick={onPress}
  >
    Increment
  </button>
);

export default App;
