import React, { useState } from "react";
import axios from "axios";
import Day from "./Day";
import "./App.css";

export default function SearchEngine() {

  let [TodaysWeather, setTodaysWeather] = useState({});
  let [ForecastWeather, setForecastWeather] = useState({});

  let [place, setPlace] = useState("");
  let [message, setMessage] = useState("");

  let apiKey = "6089e4fb28464b6a73284bc65d80e7ed";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=metric`;

  function handleSubmit(event) {
    event.preventDefault();
    setMessage(place);
    axios.get(apiUrl).then(showWeather);
  }
  function updatePlace(event) {
    setPlace(event.target.value);
  }
  function showWeather(response) {
    setTodaysWeather({
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
    getForecast(response.data.coord);
    // console.log(response);
  }
  function getForecast(coordinates) {
    let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrlForecast).then(showForecast);
  }
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days[day];
  }

  function showForecast(response) {
    console.log("forecast", response);
    setForecastWeather({
      temperatureday1: response.data.daily[0].temp.day,
      icon1: `http://openweathermap.org/img/wn/${response.data.daily[0].weather[0].icon}@2x.png`,
      day1: formatDay(response.data.daily[0].dt),

      temperatureday2: response.data.daily[1].temp.day,
      icon2: `http://openweathermap.org/img/wn/${response.data.daily[1].weather[0].icon}@2x.png`,
      day2: formatDay(response.data.daily[1].dt),

      temperatureday3: response.data.daily[2].temp.day,
      icon3: `http://openweathermap.org/img/wn/${response.data.daily[2].weather[0].icon}@2x.png`,
      day3: formatDay(response.data.daily[2].dt),

      temperatureday4: response.data.daily[3].temp.day,
      icon4: `http://openweathermap.org/img/wn/${response.data.daily[3].weather[0].icon}@2x.png`,
      day4: formatDay(response.data.daily[3].dt),

      temperatureday5: response.data.daily[4].temp.day,
      icon5: `http://openweathermap.org/img/wn/${response.data.daily[4].weather[0].icon}@2x.png`,
      day5: formatDay(response.data.daily[4].dt),
    });
  }
  return (
    <div className="LiveWeather">
      <form onSubmit={handleSubmit}>
        <input
          className="city-input"
          type="search"
          placeholder="Type a City..."
          onChange={updatePlace}
        />
        <button className="SearchCity" type="submit">
          🔍
        </button>
        <br />
        <br />
      </form>
      <h1>{message}</h1>
      <ul className="CurrentWeather">
        <li>Temperature: {Math.round(TodaysWeather.temperature)}°C</li>
        <li>Description: {TodaysWeather.description}</li>
        <li>Humidity: {TodaysWeather.humidity} %</li>
        <li>Wind: {Math.round(TodaysWeather.wind * 10) / 10} km/h</li>
        <img
          className="icon"
          src={TodaysWeather.icon}
          alt={TodaysWeather.description}
        />
      </ul>

      <div className=" container ForecastWeather">
        <div className="forecast-title">5-Day Forecast </div>
        <div className=" d-flex flex-row">
          <Day
            day={ForecastWeather.day1}
            icon={ForecastWeather.icon1}
            temperature={ForecastWeather.temperatureday1}
          />

          <Day
            day={ForecastWeather.day2}
            icon={ForecastWeather.icon2}
            temperature={ForecastWeather.temperatureday2}
          />
          <Day
            day={ForecastWeather.day3}
            icon={ForecastWeather.icon3}
            temperature={ForecastWeather.temperatureday3}
          />
          <Day
            day={ForecastWeather.day4}
            icon={ForecastWeather.icon4}
            temperature={ForecastWeather.temperatureday4}
          />
          <Day
            day={ForecastWeather.day5}
            icon={ForecastWeather.icon5}
            temperature={ForecastWeather.temperatureday5}
          />
        </div>
      </div>
    </div>
  );
}
