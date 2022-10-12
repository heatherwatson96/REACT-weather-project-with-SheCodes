import React from "react";
import "./App.css";

export default function Day(props) {
  return (
    <div className="col">
      <div className=" weather-forecast-date">{props.day}</div>
      <img className="icon1" src={props.icon} alt="" width="50" />
      <div className="weather-forecast-temperature">
        <p> {Math.round(props.temperature)}°C</p>
      </div>
    </div>
  );
}
