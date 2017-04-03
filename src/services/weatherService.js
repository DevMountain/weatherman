import axios from "axios";

import store from "../store";

import {
	  formatWeatherData
	, buildUrl
} from "../utils/weatherUtils";
import { setWeather } from "../ducks/weather";

export function getWeather( location ) {
	const weatherPromise = axios.get( buildUrl( location ) )
		.then( response => formatWeatherData( response.data ) );

	store.dispatch( setWeather( weatherPromise ) );
}
