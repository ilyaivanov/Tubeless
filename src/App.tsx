import React, { Fragment } from "react";
import "./App.css";
import { createStore } from "redux";
import { connect, Provider } from "react-redux";

interface AppProps {
  counter: number;
  increment: () => void;
}

const App = ({ counter, increment }: AppProps) => {
  return (
    <Fragment>
      <div data-testid="mylabel" className="counter-label">
        {counter}
      </div>
      <MyButton onPress={increment} isEven={counter % 2 === 0} />
    </Fragment>
  );
};

const increment = () => ({
  type: "INCREMENT"
});

const mapState = (state: any) => ({
  counter: state.counter
});

const AppConnected = connect(
  mapState,
  { increment }
)(App);

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

const reducer = (state = { counter: 0 }, action: any) => {
  if (action.type === "INCREMENT") {
    return {
      ...state,
      counter: state.counter + 1
    };
  }
  return state;
};
declare var window: any;
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default () => (
  <Provider store={store}>
    <AppConnected />
  </Provider>
);
