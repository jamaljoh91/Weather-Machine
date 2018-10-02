import React from "react";
import { render } from "react-dom";
import Results from "./Results";
import SearchParams from "./SearchParams";
import { Router } from "@reach/router";
import { Provider } from "./SearchContext";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zipcode: "27529",
      location: "Raleigh",
      forecasts: [],
      weekCast: [],
      handleZipcodeChange: this.handleZipcodeChange
    };
  }

  handleZipcodeChange = event => {
    this.setState({
      zipcode: event.target.value
    });
  };

  render() {
    return (
      <React.Fragment>
        <Provider value={this.state}>
          <Router>
            <SearchParams path="/search" />
            <Results path="/" />
          </Router>
        </Provider>
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
