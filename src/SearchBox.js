import React from "react";
import { Consumer } from "./SearchContext";

class SearchBox extends React.Component {
  handleFormSubmit = event => {
    event.preventDefault();
    this.props.search();
  };

  render() {
    return (
      <Consumer>
        {context => (
          <div className="search">
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="zipcode">
                Enter a US Zipcode
                <input
                  onChange={context.handleZipcodeChange}
                  id="zipcode"
                  value={context.zipcode}
                  placeholder="Find Forecast"
                />
              </label>
              <button>Get Forecast!</button>
            </form>
          </div>
        )}
      </Consumer>
    );
  }
}

export default SearchBox;
