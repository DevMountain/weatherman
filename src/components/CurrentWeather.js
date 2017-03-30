import React, { PropTypes } from "react";

import "./CurrentWeather.css";

import cloudy from "../assets/cloudy.svg";
import partlyCloudy from "../assets/partly-cloudy.svg";
import rainy from "../assets/rainy.svg";
import snowy from "../assets/snowy.svg";
import sunny from "../assets/sunny.svg";

export default function CurrentWeather( props ) {
	const {
		  icon
		, currentTemperature
		, location
		, maxTemperature
		, minTemperature
		, wind
		, humidity
	} = props.weather;

	return (
		<div className="current-weather">
			<h3 className="current-weather__location">{ location }</h3>
			<img
				alt="sunny"
				className="current-weather__icon"
				src={ icon }
			/>
			<h3 className="current-weather__temp">{ currentTemperature }°</h3>

			<div className="current-weather__separator" />

			<ul className="current-weather__stats">
				<li className="current-weather__stat">Max: { maxTemperature }°</li>
				<li className="current-weather__stat">Min: { minTemperature }°</li>
				<li className="current-weather__stat">Wind: { wind } MPH</li>
				<li className="current-weather__stat">Humidity: { humidity }%</li>
			</ul>
		</div>
	);
}

CurrentWeather.propTypes = {
	weather: PropTypes.shape( {
		  icon: PropTypes.string.isRequired
		, currentTemperature: PropTypes.number.isRequired
		, maxTemperature: PropTypes.number.isRequired
		, minTemperature: PropTypes.number.isRequired
		, wind: PropTypes.number.isRequired
		, humidity: PropTypes.number.isRequired
	} ).isRequired
};
