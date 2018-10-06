import React from "react";
import { render } from "react-dom";
import Results from "./Results";
import SearchParams from "./SearchParams";
import { Router } from "@reach/router";
import { Provider } from "./SearchContext";
import Details from "./Details";
import { reactLocalStorage } from "reactjs-localstorage";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zipcode: reactLocalStorage.get("zipcode") || "27529",
      location: "Raleigh",
      forecasts: [],
      weekCast: [],
      handleZipcodeChange: this.handleZipcodeChange,
      handleLocationChange: this.handleLocationChange,
      handleForecastsChange: this.handleForecastsChange
    };
  }

  handleZipcodeChange = event => {
    this.setState({
      zipcode: event.target.value
    });
    reactLocalStorage.set("zipcode", event.target.value);
  };

  handleLocationChange = location => {
    this.setState({
      location
    });
  };

  handleForecastsChange = forecasts => {
    this.setState({
      forecasts
    });
  };

  render() {
    return (
      <React.Fragment>
        <Provider value={this.state}>
          <Router>
            <SearchParams path="/search" />
            <Results path="/" />
            <Details path="/details/:id" />
          </Router>
        </Provider>
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
