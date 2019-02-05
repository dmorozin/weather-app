import React, { Component } from "react";

class Days extends Component {
  render() {
    let value = this.props.data.list.map((day, i) => {
      return (
        <div className="card" key={day.dt}>
          <img
            alt={day.weather[0].description}
            className="card-img-top"
            src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
            style={{ height: "70px", width: "70px", textAlign: "center" }}
          />
          <div className="card-body">
            <h5 className="card-title">{day.weather[0].main}</h5>

            <p className="card-text">
              Temperature: {parseInt(day.main.temp - 273)} °C
            </p>

            <div className="card-footer bg-transparent">{day.dt_txt}</div>
          </div>
        </div>
      );
    });
    return <div className="row">{value}</div>;
  }
}

export default Days;
