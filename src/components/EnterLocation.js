import React, { Component } from "react";

import "./EnterLocation.css";

export default class EnterLocation extends Component {
	constructor( props ) {
		super( props );

		this.state = { location: "" };

		this.handleChange = this.handleChange.bind( this );
	}

	handleChange( event ) {
		this.setState( { location: event.target.value } );
	}

	render() {
		return (
			<div className="enter-location">
				<input
					className="enter-location__input"
					onChange={ this.handleChange }
					placeholder="London / 84601"
					type="text"
					value={ this.state.location }
				/>
				<button className="enter-location__submit">Submit</button>
			</div>
		);
	}
}
