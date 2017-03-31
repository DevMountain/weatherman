const FETCH_WEATHER = "FETCH_WEATHER";
const RESET = "RESET";

const initialState = {
	  loading: false
	, search: true
	, weather: {}
};

export default function weather( state = initialState, action ) {
	switch ( action.type ) {
		case FETCH_WEATHER + "_PENDING":
			return {
				  loading: true
				, search: true
				, weather: {}
			};
		case FETCH_WEATHER + "_FULFILLED":
			return {
				  loading: false
				, search: false
				, weather: action.payload
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
