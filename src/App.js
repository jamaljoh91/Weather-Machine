import React from "react";
import { render } from "react-dom";
import Results from "./Results";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>5 Day Forecast for 27529 </h1>
        <Results />
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
