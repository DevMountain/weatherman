import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

import hourglass from "./assets/hourglass.svg";

import { reset } from "./ducks/weather";

import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import EnterLocation from "./components/EnterLocation/EnterLocation";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

class App extends Component {
	render() {

		return (
			<div className="app">
				<h1 className="app__title">WEATHERMAN</h1>
				<EnterLocation />
			</div>
		);
	}
}

export default connect( state => state, { reset } )( App );
