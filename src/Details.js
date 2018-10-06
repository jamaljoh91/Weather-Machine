import React from "react";
import { Consumer } from "./SearchContext";
import posed from "react-pose";
import { Link } from "@reach/router";

const Box = posed.div({
  hoverable: true,
  init: {
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    transition: { duration: 50 }
  },
  hover: {
    scale: 1.04,
    boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
    transition: { duration: 200 }
  }
});

class Details extends React.Component {
  state = {
    forecasts: this.props.forecasts.forecasts,
    hourlyForecasts: [],
    fullDate: ""
  };

  componentDidMount() {
    if (this.state.forecasts.length) {
      const date = this.props.location.state.date.split(" ")[0];

      if (date) {
        const hourlyForecasts = this.state.forecasts.filter(forecast => {
          if (date === forecast.date.split(" ")[0]) return forecast;
        });

        hourlyForecasts.forEach(forecast => {
          // console.log(forecast.date);
          var date = new Date(forecast.date);
          // console.log("date", date);
          forecast.time = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit"
          });
        });

        this.setState({
          fullDate: hourlyForecasts[0].fullDate,
          hourlyForecasts: hourlyForecasts
        });
      }
    }
  }

  render() {
    let hourlyCasts = [];

    if (this.state.hourlyForecasts) {
      hourlyCasts = this.state.hourlyForecasts.map((cast, index) => {
        const { time, icon, description, temperature } = cast;

        return (
          <Box key={index} className="weatherCards__cards">
            <React.Fragment>
              <h1>{time}</h1>
              <img
                style={{ width: "100px", height: "100px" }}
                src={`http://openweathermap.org/img/w/${icon}.png`}
                alt={description}
              />
              <h2 className="cards__description">{description}</h2>
              <div className="temperatures">
                <h3 className="temperatures__low-temp">
                  Expected: {temperature}°
                </h3>
              </div>
            </React.Fragment>
          </Box>
        );
      });
    }

    return (
      <div className="container">
        <div className="weatherCards">
          <Link to="/" className="container__resultLocation">
            <span aria-label="back to home" role="img">
              ⬅️ Back to Daily Forecast ☀️
            </span>
          </Link>
          <h1 className="container__resultLocation">
            Hourly Forecast For: {this.state.fullDate}
          </h1>
          {hourlyCasts}
        </div>
      </div>
    );
  }
}

export default function ResultsWithContext(props) {
  return (
    <Consumer>
      {forecasts => <Details {...props} forecasts={forecasts} />}
    </Consumer>
  );
}
