import React from "react";

const SearchContext = React.createContext({
  zipcode: "27529",
  forecasts: [],
  weekCast: "",
  location: "Raleigh",
  handleZipcodeChange() {}
});

export const Provider = SearchContext.Provider;
export const Consumer = SearchContext.Consumer;
