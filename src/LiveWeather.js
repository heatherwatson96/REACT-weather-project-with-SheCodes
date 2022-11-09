import React, { useState } from "react";
import axios from "axios";
import Day from "./Day";
import FormattedDate from "./FormattedDate";
import "./LiveWeather.css";
import WeatherTemperature from "./WeatherTemperature";

export default function SearchEngine() {
  const [TodaysWeather, setTodaysWeather] = useState({ ready: false });
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
      ready: true,
      date: new Date(response.data.dt * 1000),
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
      maxTemperatureday1: response.data.daily[0].temp.max,
      minTemperatureday1: response.data.daily[0].temp.min,
      icon1: `http://openweathermap.org/img/wn/${response.data.daily[0].weather[0].icon}@2x.png`,
      day1: formatDay(response.data.daily[0].dt),

      maxTemperatureday2: response.data.daily[1].temp.max,
      minTemperatureday2: response.data.daily[1].temp.min,
      icon2: `http://openweathermap.org/img/wn/${response.data.daily[1].weather[0].icon}@2x.png`,
      day2: formatDay(response.data.daily[1].dt),

      maxTemperatureday3: response.data.daily[2].temp.max,
      minTemperatureday3: response.data.daily[2].temp.min,
      icon3: `http://openweathermap.org/img/wn/${response.data.daily[2].weather[0].icon}@2x.png`,
      day3: formatDay(response.data.daily[2].dt),

      maxTemperatureday4: response.data.daily[3].temp.max,
      minTemperatureday4: response.data.daily[3].temp.min,
      icon4: `http://openweathermap.org/img/wn/${response.data.daily[3].weather[0].icon}@2x.png`,
      day4: formatDay(response.data.daily[3].dt),

      maxTemperatureday5: response.data.daily[4].temp.max,
      minTemperatureday5: response.data.daily[4].temp.min,
      icon5: `http://openweathermap.org/img/wn/${response.data.daily[4].weather[0].icon}@2x.png`,
      day5: formatDay(response.data.daily[4].dt),
    });
  }
  return (
    <div className="live-weather">
      <form onSubmit={handleSubmit}>
        <input
          className="city-input"
          type="search"
          placeholder="Type a City..."
          onChange={updatePlace}
        />
        <button className="search-city" type="submit">
          🔍
        </button>
        <br />
      </form>
      {TodaysWeather.ready && (
        <>
          <h1 className="text-capitalisation">{message}</h1>
          <br />
          <ul className="current-weather">
            <li>
              <FormattedDate date={TodaysWeather.date} />
            </li>
            <li className="temp-icon">
              <img
                className="icon"
                src={TodaysWeather.icon}
                alt={TodaysWeather.description}
              />{" "}
              <WeatherTemperature celsius={TodaysWeather.temperature} />
            </li>
            <li className="text-capitalisation">
              {" "}
              {TodaysWeather.description}
            </li>
            <li>Humidity: {TodaysWeather.humidity} %</li>
            <li>Wind: {Math.round(TodaysWeather.wind * 10) / 10} km/h</li>
          </ul>

          <div className=" container forecast-weather">
            <div className="forecast-title">5-Day Forecast </div>
            <div className=" d-flex flex-row">
              <Day
                day={ForecastWeather.day1}
                icon={ForecastWeather.icon1}
                maxTemperature={ForecastWeather.maxTemperatureday1}
                minTemperature={ForecastWeather.minTemperatureday1}
              />

              <Day
                day={ForecastWeather.day2}
                icon={ForecastWeather.icon2}
                maxTemperature={ForecastWeather.maxTemperatureday2}
                minTemperature={ForecastWeather.minTemperatureday2}
              />
              <Day
                day={ForecastWeather.day3}
                icon={ForecastWeather.icon3}
                maxTemperature={ForecastWeather.maxTemperatureday3}
                minTemperature={ForecastWeather.minTemperatureday3}
              />
              <Day
                day={ForecastWeather.day4}
                icon={ForecastWeather.icon4}
                maxTemperature={ForecastWeather.maxTemperatureday4}
                minTemperature={ForecastWeather.minTemperatureday4}
              />
              <Day
                day={ForecastWeather.day5}
                icon={ForecastWeather.icon5}
                maxTemperature={ForecastWeather.maxTemperatureday5}
                minTemperature={ForecastWeather.minTemperatureday5}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
