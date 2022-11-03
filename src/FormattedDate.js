import React from "react";
import "./FormattedDate.css";

export default function FormattedDate(props) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[props.date.getDay()];
  let hours = props.date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let mins = props.date.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }
  return (
    <div className="formatted-date">
      {day} <br />
      {hours}:{mins}
    </div>
  );
}
