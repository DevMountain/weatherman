import React, { PropTypes } from "react";

import "./CurrentWeather.css";

export default function CurrentWeather( { weather, reset } ) {
	return (
		<div className="current-weather">
			<div className="current-weather__weather">
				<h3 className="current-weather__location">Provo</h3>
				<img
					alt="sunny"
					className="current-weather__icon"
					src={ "" }
				/>
				<h3 className="current-weather__temp">44°</h3>

				<div className="current-weather__separator" />

				<ul className="current-weather__stats">
					<li className="current-weather__stat">Max: 68°</li>
					<li className="current-weather__stat">Min: 34°</li>
					<li className="current-weather__stat">Wind: 4,38 MPH</li>
					<li className="current-weather__stat">Humidity: 62%</li>
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
