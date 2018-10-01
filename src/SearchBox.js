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
          <React.Fragment>
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="zipcode">
                Zipcode
                <input
                  onChange={context.handleZipcodeChange}
                  id="zipcode"
                  value={context.zipcode}
                  placeholder="Enter Zipcode"
                />
              </label>

              <button>Search!</button>
            </form>
          </React.Fragment>
        )}
      </Consumer>
    );
  }
}

export default SearchBox;
