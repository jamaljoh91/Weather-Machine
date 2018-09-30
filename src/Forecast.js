import React from "react";
import img from "./placeholder.jpg";

class Forecast extends React.Component {
  //True values will come in as props from parent
  render() {
    const { day, highTemp, lowTemp, date, weather } = this.props;
    return (
      <React.Fragment>
        <h1>{day}</h1>
        <img
          style={{ width: "500px", height: "200px" }}
          src={img}
          alt="google"
        />
        <p>{highTemp}°</p>
        <p>{lowTemp}°</p>
      </React.Fragment>
    );
  }
}

export default Forecast;
