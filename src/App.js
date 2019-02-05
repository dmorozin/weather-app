import React, { Component } from "react";
import Days from "./Days.js";
import Search from "./Search.js";

class App extends Component {
  state = {
    weather: {
      icon: "",
      main: "",
      description: "",
      city: "",
      hum: "",
      press: "",
      wind: "",
      temperature: ""
    },
    key: "d5412dbf0bdf8db01fb61e378f8736bf",
    _fiveDays: {
      city: {},
      list: []
    },
    searchingCity: "",
    searchingCountry: "",
    isLoadingCurrent: false,
    isLoadingDays: false
  };

  componentDidMount() {
    this.setState({ isLoadingCurrent: true, isLoadingDays: true });
    const success = position => {
      fetch(
        `
        https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${
          position.coords.longitude
        }&appid=${this.state.key}`
      )
        .then(res => res.json())
        .then(data =>
          this.setState({
            weather: {
              icon: data.weather[0].icon,
              main: data.weather[0].main,
              description: data.weather[0].description,
              city: data.name,
              hum: data.main.humidity,
              press: data.main.pressure,
              wind: data.wind.speed,
              temperature: data.main.temp
            },
            isLoadingCurrent: false
          })
        )
        .catch(err => console.log(err));

      fetch(
        `
          https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${
          position.coords.longitude
        }&appid=${this.state.key}`
      )
        .then(res => res.json())
        .then(data =>
          this.setState({
            _fiveDays: {
              city: data.city,
              list: data.list
            },
            isLoadingDays: false
          })
        )
        .catch(err => console.log(err));
    };

    navigator.geolocation.getCurrentPosition(success, () => console.log("Can't get location"));
  }

  searchCity = (city, country) => {
    this.setState({ searchingCity: city, searchingCountry: country });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchingCity !== this.state.searchingCity || prevState.searchingCountry !== this.state.searchingCountry) {
      fetch(
        `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${this.state.searchingCity},${
          this.state.searchingCountry
        }&appid=${this.state.key}`
      )
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.cod !== "404")
            this.setState({
              weather: {
                icon: data.weather[0].icon,
                main: data.weather[0].main,
                description: data.weather[0].description,
                city: data.name,
                hum: data.main.humidity,
                press: data.main.pressure,
                wind: data.wind.speed,
                temperature: data.main.temp
              }
            });
          else window.alert(data.message);
        })
        .catch(err => console.log(err));

      fetch(
        `
          https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?q=${this.state.searchingCity},${
          this.state.searchingCountry
        }&appid=${this.state.key}`
      )
        .then(res => res.json())
        .then(data => {
          if (data.cod !== "404")
            this.setState({
              _fiveDays: {
                city: data.city,
                list: data.list
              }
            });
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    const weather = this.state.weather;
    let retVal;
    if (!this.state.isLoadingCurrent && !this.state.isLoadingDays) {
      retVal = (
        <div>
          <div className="card m-4 mx-auto" style={{ width: "18rem" }}>
            {weather.icon ? (
              <img
                alt={weather.description}
                className="card-img-top"
                src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                style={{ height: "100px", width: "100px", textAlign: "center" }}
              />
            ) : null}
            <div className="card-body">
              <h5 className="card-title">{weather.city}</h5>
              <p className="card-text">{weather.main}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Temperature: {parseInt(weather.temperature - 273)} °C</li>
              <li className="list-group-item">Humidity: {weather.hum} %</li>
              <li className="list-group-item">Pressure: {weather.press + " hPa"}</li>
              <li className="list-group-item">Wind: {weather.wind} m/s</li>
            </ul>
          </div>

          <Days data={this.state._fiveDays} />
        </div>
      );
    } else {
      retVal = <h2>Loading...</h2>;
    }

    return (
      <div className="App container">
        <Search searchCity={this.searchCity} />
        <div>{retVal}</div>
      </div>
    );
  }
}

export default App;
