import cloudy from "../assets/cloudy.svg";
import partlyCloudy from "../assets/partly-cloudy.svg";
import rainy from "../assets/rainy.svg";
import snowy from "../assets/snowy.svg";
import sunny from "../assets/sunny.svg";
import unknownIcon from "../assets/unknown-icon.svg";

const BASE_URL = ``;
function isZipCode( location ) { return !isNaN( parseInt( location ) ); }
function getWeatherIcon( conditionCode ) { if ( conditionCode === 800 ) { return sunny; } if ( conditionCode >= 200 && conditionCode < 600 ) { return rainy; } if ( conditionCode >= 600 && conditionCode < 700 ) { return snowy; } if ( conditionCode >= 801 && conditionCode <= 803 ) { return partlyCloudy; } if ( conditionCode === 804 ) { return cloudy; } return unknownIcon; }
export function formatWeatherData( weatherData ) { return { icon: getWeatherIcon( weatherData.weather[ 0 ].id ), currentTemperature: weatherData.main.temp, location: weatherData.name, maxTemperature: weatherData.main.temp_max, minTemperature: weatherData.main.temp_min, humidity: weatherData.main.humidity, wind: weatherData.wind.speed }; }
export function buildURL( location ) { if ( isZipCode( location ) ) { return BASE_URL + `zip=${location}`; } return BASE_URL + `q=${location}`; }