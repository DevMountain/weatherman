import React from "react";

import "./CurrentWeather.css";

import cloudy from "../assets/cloudy.svg";
import partlyCloudy from "../assets/partly-cloudy.svg";
import rainy from "../assets/rainy.svg";
import snowy from "../assets/snowy.svg";
import sunny from "../assets/sunny.svg";

export default function CurrentWeather() {
	return (
		<div className="current-weather">
			<h3 className="current-weather__location">Provo</h3>
			<img
				alt="sunny"
				className="current-weather__icon"
				src={ sunny }
			/>
			<h3 className="current-weather__temp">72°</h3>

			<div className="current-weather__separator" />

			<ul className="current-weather__stats">
				<li className="current-weather__stat">Max: 84°</li>
				<li className="current-weather__stat">Min: 64°</li>
				<li className="current-weather__stat">Wind: 7.59 MPH</li>
				<li className="current-weather__stat">Humidity: 42%</li>
			</ul>
		</div>
	);
}
