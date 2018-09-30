import React from "react";
import Forecast from "./Forecast";
import axios from "axios";

const API_KEY = process.env.API_KEY;

class Results extends React.Component {
  state = {
    forecasts: [],
    weekCast: [],
    loading: true
  };

  componentDidMount() {
    //Pull in forecast data for the week
    let url = `http://api.openweathermap.org/data/2.5/forecast?zip=27529&units=imperial&APPID=${API_KEY}`;
    axios.get(url).then(res => {
      const weatherForecast = res.data.list;

      let forecasts = weatherForecast.map(forecast => {
        return {
          date: forecast.dt_txt,
          temperature: Math.floor(forecast.main.temp),
          description: forecast.weather[0].description,
          icon: forecast.weather[0].icon,
          day: "",
          fullDate: ""
        };
      });

      forecasts.forEach(forecast => this.getDay(forecast));

      this.setState(
        {
          forecasts
        },
        this.getWeekCast
      );
    });
  }

  getDay = forecast => {
    //format the dates to get the day and to be a bit cleaner
    var date = new Date(forecast.date);
    forecast.day = date.toLocaleDateString("en-US", { weekday: "long" });

    forecast.fullDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "2-digit"
    });
    return forecast;
  };

  getWeekCast = () => {
    //check if the forecast has been updated
    if (this.state.forecasts) {
      let weekCast = [];
      this.state.forecasts.forEach(forecast => {
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
            day: forecast.day,
            highTemp: forecast.temperature,
            lowTemp: forecast.temperature,
            description: forecast.description,
            fullDate: forecast.fullDate,
            icon: forecast.icon
          };
          weekCast.push(dayCast);
        }
      });

      this.setState({
        weekCast,
        loading: false
      });
    }
  };

  render() {
    if (this.state.loading) {
      return <h1>Gathering Weather Data...</h1>;
    }

    return (
      <React.Fragment>
        {this.state.weekCast.map((cast, index) => {
          return (
            <Forecast
              key={index}
              fullDate={cast.fullDate}
              highTemp={cast.highTemp}
              lowTemp={cast.lowTemp}
              description={cast.description}
              icon={cast.icon}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default Results;
