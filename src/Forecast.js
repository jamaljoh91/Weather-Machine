import React from "react";
import img from "./placeholder.jpg";

class Forecast extends React.Component {
  //True values will come in as props from parent
  render() {
    const { fullDate, highTemp, lowTemp, description, icon } = this.props;

    return (
      <React.Fragment>
        <h1>{fullDate}</h1>
        <img
          style={{ width: "100px", height: "100px" }}
          src={`http://openweathermap.org/img/w/${icon}.png`}
          alt={description}
        />
        <p>{description}</p>
        <p>{highTemp}°</p>
        <p>{lowTemp}°</p>
      </React.Fragment>
    );
  }
}

export default Forecast;
