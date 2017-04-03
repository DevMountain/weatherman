const RESET = "RESET";
const SET_WEATHER = "SET_WEATHER";

const initialState = {
	  error: false
	, loading: false
	, search: true
	, weather: {}
};

export default function weather( state = initialState, action ) {
	switch ( action.type ) {
		case SET_WEATHER + "_PENDING":
			return {
				  error: false
				, loading: true
				, search: false
				, weather: {}
			};
		case SET_WEATHER + "_FULFILLED":
			return {
				  error: false
				, loading: false
				, search: false
				, weather: action.payload
			};
		case SET_WEATHER + "_REJECTED":
			return {
				  error: true
				, loading: false
				, search: false
				, weather: {}
			};
		case RESET: return initialState;
		default: return state;
	}
}

export function reset() {
	return { type: RESET };
}

export function setWeather( weatherPromise ) {
	return { payload: weatherPromise, type: SET_WEATHER };
}
