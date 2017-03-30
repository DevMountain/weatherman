import React, { Component } from "react";

import "./App.css";

import CurrentWeather from "./components/CurrentWeather";
import EnterLocation from "./components/EnterLocation";

class App extends Component {
	render() {
		return (
			<div className="app">
				<h1 className="app__title">WEATHERMAN</h1>
				{/*<EnterLocation />*/}
				<CurrentWeather />
			</div>
		);
	}
}

export default App;
