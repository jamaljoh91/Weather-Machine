import React from "react";
import Forecast from "./Forecast";

class Results extends React.Component {
  state = {
    forecast: [
      { day: "Monday", highTemp: 90, lowTemp: 70, weather: "Cloudy" },
      { day: "Tuesday", highTemp: 80, lowTemp: 50, weather: "Sunny" },
      { day: "Wednesday", highTemp: 30, lowTemp: 71, weather: "Rainy" },
      { day: "Thursday", highTemp: 10, lowTemp: 17, weather: "Snowing" },
      { day: "Friday", highTemp: 770, lowTemp: 210, weather: "TYPHOON" }
    ]
  };

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        {this.state.forecast.map((forecast, index) => {
          return (
            <Forecast
              key={index}
              day={forecast.day}
              highTemp={forecast.highTemp}
              lowTemp={forecast.lowTemp}
              weather={forecast.weather}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default Results;
