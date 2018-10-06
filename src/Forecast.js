import React from "react";
import { Link } from "@reach/router";

class Forecast extends React.Component {
  //True values will come in as props from parent
  render() {
    const {
      id,
      fullDate,
      highTemp,
      lowTemp,
      description,
      icon,
      date
    } = this.props;

    return (
      <Link to={`/details/${id}`} state={{ date }} className="forecast">
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
      </Link>
    );
  }
}

export default Forecast;
