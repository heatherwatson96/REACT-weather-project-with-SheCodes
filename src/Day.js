import React from "react";
import "./Day.css";

export default function Day(props) {
  return (
    <div className="col">
      <div className=" weather-forecast-date">{props.day}</div>
      <img className="icon1" src={props.icon} alt="" width="50" />
      <div className="temps">
        <span className="max-temp"> {Math.round(props.maxTemperature)}°C {"|"}</span>
        <span className="min-temp">{Math.round(props.minTemperature)}°C</span>
      </div>
    </div>
  );
}
