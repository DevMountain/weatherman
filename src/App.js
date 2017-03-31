import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";
import hourglass from "./assets/hourglass.svg";

import { reset } from "./ducks/weather";

import CurrentWeather from "./components/CurrentWeather";
import EnterLocation from "./components/EnterLocation";

class App extends Component {
	render() {
		const { loading, reset, search, weather } = this.props;

		return (
			<div className="app">
				<h1 className="app__title">WEATHERMAN</h1>
				{ loading ? <img src={ hourglass } alt="loading indicator"/> : null }
				{ search ? <EnterLocation /> : null }
				{ !search && !loading ? <CurrentWeather reset={ reset } weather={ weather } /> : null }
			</div>
		);
	}
}

export default connect( state => state, { reset } )( App );
