import React, { PropTypes } from "react";

import "./ErrorMessage.css";

export default function ErrorMessage( { reset } ) {
    return (
        <div className="error-message">
            <h3 className="error-message__message">There was a problem fetching the weather!</h3>
            <button
				className="error-message__try-again"
				onClick={ reset }
			>
				Try again?
			</button>
        </div>
    );
}

ErrorMessage.propTypes = {
    reset: PropTypes.func.isRequired
};
