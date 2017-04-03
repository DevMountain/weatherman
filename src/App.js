import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

import hourglass from "./assets/hourglass.svg";

import { reset } from "./ducks/weather";

import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import EnterLocation from "./components/EnterLocation/EnterLocation";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

class App extends Component {
	renderChildren() {
		const {
			  error
			, loading
			, search
			, weather
			, reset
		} = this.props;

		if ( error ) {
			return <ErrorMessage reset={ reset } />
		}

		if ( loading ) {
			return (
				<img
					alt="loading indicator"
					src={ hourglass }
				/>
			);
		}

		if ( search ) {
			return <EnterLocation />;
		}

		return (
			<CurrentWeather
				reset={ reset }
				weather={ weather }
			/>
		);
	}

	render() {
		return (
			<div className="app">
				<h1 className="app__title">WEATHERMAN</h1>
				{ this.renderChildren() }
			</div>
		);
	}
}

export default connect( state => state, { reset } )( App );
