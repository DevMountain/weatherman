import React, { PropTypes } from "react";

import "./CurrentWeather.css";

export default function CurrentWeather( { weather, reset } ) {
	const {
		  currentTemperature
		, humidity
		, icon
		, location
		, maxTemperature
		, minTemperature
		, wind
	} = weather;

	return (
		<div className="current-weather">
			<div className="current-weather__weather">
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
					<li className="current-weather__stat">Wind: { humidity } MPH</li>
					<li className="current-weather__stat">Humidity: { wind }%</li>
				</ul>
			</div>
			<button
				className="current-weather__search-again"
				onClick={ reset }
			>
				Search Again
			</button>
		</div>
	);
}

CurrentWeather.propTypes = {
	  reset: PropTypes.func.isRequired
	, weather: PropTypes.shape( {
		  icon: PropTypes.string.isRequired
		, currentTemperature: PropTypes.number.isRequired
		, maxTemperature: PropTypes.number.isRequired
		, minTemperature: PropTypes.number.isRequired
		, wind: PropTypes.number.isRequired
		, humidity: PropTypes.number.isRequired
	} ).isRequired
};
