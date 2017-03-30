const FETCH_WEATHER = "FETCH_WEATHER";

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
		default: return state;
	}
}

export function setWeather( weatherPromise ) {
	return { type: FETCH_WEATHER, payload: weatherPromise };
}
