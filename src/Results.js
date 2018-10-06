import React from "react";
import Forecast from "./Forecast";
import axios from "axios";
import SearchBox from "./SearchBox";
import { Consumer } from "./SearchContext";
import posed from "react-pose";

const API_KEY = process.env.API_KEY;

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

class Results extends React.Component {
  state = {
    loading: true,
    error: false
  };

  componentDidMount() {
    this.search();
  }

  search = () => {
    const { searchParams } = this.props;

    //Pull in forecast data for the week
    let url = `https://api.openweathermap.org/data/2.5/forecast?zip=${
      this.props.searchParams.zipcode
    }&units=imperial&APPID=${API_KEY}`;
    axios
      .get(url)
      .then(res => {
        const weatherForecast = res.data.list;
        searchParams.handleLocationChange(res.data.city.name);
        let forecasts = weatherForecast.map(forecast => {
          return {
            id: forecast.dt,
            date: forecast.dt_txt,
            temperature: Math.floor(forecast.main.temp),
            description: forecast.weather[0].description,
            icon: forecast.weather[0].icon,
            day: "",
            fullDate: ""
          };
        });

        forecasts.forEach(forecast => this.getDay(forecast));

        searchParams.handleForecastsChange(forecasts);
        this.getWeekCast();
      })
      .catch(
        this.setState({
          error: true
        })
      );
  };

  getDay = forecast => {
    //format the dates to get the day and to be a bit cleaner
    var date = new Date(forecast.date);
    forecast.day = date.toLocaleDateString("en-US", { weekday: "long" });

    forecast.fullDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric"
    });
    return forecast;
  };

  getWeekCast = () => {
    //check if the forecast has been updated
    if (this.props.searchParams.forecasts) {
      let weekCast = [];
      this.props.searchParams.forecasts.forEach(forecast => {
        //check if the forecast data for that day exists
        if (weekCast.some(day => day.day === forecast.day)) {
          weekCast.forEach(day => {
            //compare temps to get the right high and low temperatures
            if (day.day === forecast.day) {
              let highTemp = day.highTemp;
              day.highTemp = Math.max(day.highTemp, forecast.temperature);
              day.lowTemp = Math.min(day.lowTemp, forecast.temperature);

              if (highTemp != day.highTemp) {
                day.icon = forecast.icon;
              }
            }
          });
        } else {
          //if we don't have forecast data create a new object for the day
          let dayCast = {
            id: forecast.id,
            day: forecast.day,
            highTemp: forecast.temperature,
            lowTemp: forecast.temperature,
            description: forecast.description,
            fullDate: forecast.fullDate,
            icon: forecast.icon,
            date: forecast.date
          };
          weekCast.push(dayCast);
        }
      });

      this.setState({
        weekCast,
        loading: false,
        error: false
      });
    }
  };

  render() {
    if (this.state.loading || this.state.error) {
      return (
        <React.Fragment>
          <SearchBox search={this.search} />
          <h1>
            Gathering Weather Data...
            <span aria-label="loading" role="img">
              ⌛️
            </span>
          </h1>
          <h2>Enter another zipcode if search is frozen.</h2>
        </React.Fragment>
      );
    }

    const casts = this.state.weekCast.map((cast, index) => {
      return (
        <Box key={index} className="weatherCards__cards">
          <Forecast
            id={cast.id}
            fullDate={cast.fullDate}
            highTemp={cast.highTemp}
            lowTemp={cast.lowTemp}
            description={cast.description}
            icon={cast.icon}
            forecast={this.state.forecasts}
            date={cast.date}
          />
        </Box>
      );
    });

    return (
      <React.Fragment>
        <div className="container">
          <div className="weatherCards">
            <SearchBox search={this.search} />
            <h1 className="container__resultLocation">
              Weather Forecast For: {this.props.searchParams.location}
            </h1>
            {casts}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default function ResultsWithContext(props) {
  return (
    <Consumer>
      {context => <Results {...props} searchParams={context} />}
    </Consumer>
  );
}
