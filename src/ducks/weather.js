import { buildURL, formatWeatherData } from '../utils/weatherUtils';

const initialState = {
  error: false,
  loading: false,
  search: true,
  weather: {}
};

const RESET = "RESET";

export default function weather( state = initialState, action ) {
  switch ( action.type ) {
    case RESET: return initialState;
    default: return state;
  }
}

export function reset() {
  return { type: RESET };
}
