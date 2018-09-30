import React from "react";
import Forecast from "./Forecast";
import axios from "axios";

const API_KEY = process.env.API_KEY;

class Results extends React.Component {
  state = {
    forecasts: [],
    weekCast: []
  };

  componentDidMount() {
    let url = `http://api.openweathermap.org/data/2.5/forecast?zip=27529&units=imperial&APPID=${API_KEY}`;
    axios.get(url).then(res => {
      const weatherForecast = res.data.list;

      let forecasts = weatherForecast.map(forecast => {
        return {
          date: forecast.dt_txt,
          temperature: Math.floor(forecast.main.temp),
          forecast: forecast.weather[0].main,
          day: ""
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
    var date = new Date(forecast.date);
    forecast.day = date.toLocaleDateString("en-US", { weekday: "long" });
    return forecast;
  };

  getWeekCast = () => {
    if (this.state.forecasts) {
      // console.log(this.state.forecasts);

      let days = [];
      this.state.forecasts.forEach(forecast => {
        let something = {
          day: "",
          highTemp: null,
          lowTemp: null,
          weather: ""
        };

        if (days.indexOf(forecast.day) == -1) {
          something.day = forecast.day;
        }

        // if (something.day == forecast.day) {
        //   something.highTemp = Math.max(
        //     something.highTemp,
        //     forecast.temperature
        //   );
        //   something.lowTemp = Math.min(something.lowTemp, forecast.temperature);
        // }

        days.push(something);
        console.log(days);

        return days;
      });
    }

    let weekCast = [];

    return weekCast;
  };

  render() {
    return (
      <React.Fragment>
        {this.state.forecasts.map((forecast, index) => {
          return (
            <Forecast
              key={index}
              date={forecast.date}
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
