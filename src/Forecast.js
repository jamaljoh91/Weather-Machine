import React from "react";

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
        <h2 className="cards__description">{description}</h2>
        <div className="temperatures">
          <h3 className="temperatures__high-temp">High: {highTemp}°</h3>
          <h3 className="temperatures__low-temp">Low: {lowTemp}°</h3>
        </div>
      </React.Fragment>
    );
  }
}

export default Forecast;
