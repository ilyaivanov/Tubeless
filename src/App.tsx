import React, { Fragment, useState } from "react";
import "./App.css";

const App = () => {
  const [counter, setCounter] = useState(0);
  const className = ["main-button", counter % 2 === 0 ? "yellow" : "blue"].join(
    " "
  );
  return (
    <Fragment>
      <div data-testid="mylabel" className="counter-label">
        {counter}
      </div>
      <button
        data-testid="mybutton"
        className={className}
        onClick={() => setCounter(counter + 1)}
      >
        Increment
      </button>
    </Fragment>
  );
};

export default App;
