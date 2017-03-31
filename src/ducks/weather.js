const FETCH_WEATHER = "FETCH_WEATHER";
const RESET = "RESET";

const initialState = {
	  error: false
	, loading: false
	, search: true
	, weather: {}
};

export default function weather( state = initialState, action ) {
	switch ( action.type ) {
		case FETCH_WEATHER + "_PENDING":
			return {
				  error: false
				, loading: true
				, search: true
				, weather: {}
			};
		case FETCH_WEATHER + "_FULFILLED":
			return {
				  error: false
				, loading: false
				, search: false
				, weather: action.payload
			};
		case FETCH_WEATHER + "_REJECTED":
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

export function setWeather( weatherPromise ) {
	return { type: FETCH_WEATHER, payload: weatherPromise };
}

export function reset() {
	return { type: RESET };
}
