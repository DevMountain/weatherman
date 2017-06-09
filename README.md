<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# Project Summary

<img src="https://raw.githubusercontent.com/DevMountain/weatherman/master/readme-assets/solution.PNG"/>

In this project we'll be building a weather app that allows users to search for the current weather anywhere in the world. We'll make use of the [OpenWeatherMap](https://openweathermap.org/) API and [Redux Promise Middleware](https://github.com/pburtchaell/redux-promise-middleware) to accomplish this in a user friendly fashion.

## Setup

* Go to <a href="https://home.openweathermap.org/users/sign_up">OpenWeatherMap</a> and create an account. You'll need an API key to complete this project. 
  * The API key can take up to 10 minutes to activate.
* `Fork` and `clone` this repository.
* `cd` into the project directory.
* Run `npm i` to install dependencies.
* Run `npm start` to spin up the development server.

## Step 1

### Summary

We will begin this project by installing new dependencies and modifying the store to handle promises.

### Instructions

* Run `npm install redux-promise-middleware axios`.
* Open `src/store.js`.
* Import `promiseMiddleware` from `redux-promise-middleware`.
* Import `applyMiddleware` from `redux`.
* Modify the original `createStore` to have two additional parameters after `weather`:
  * `undefined` - This could be an initial state, but since the reducer is handling that, let's just pass `undefined`.
  * `applyMiddleware( promiseMiddleware() )` - This will tell Redux that we want the middleware called on every action that is dispatched.

### Solution

<details>

<summary> <code> src/store.js </code> </summary>

```js
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import weather from "./ducks/weather";

export default createStore( weather, undefined, applyMiddleware( promiseMiddleware() ) );
```

</details>

## Step 2

### Summary

In this step, we will add an action for fetching weather data and handle all possible outcomes in the reducer in `src/ducks/weather.js`.

### Instructions

* Open `src/ducks/weather.js`.
* Create a new action type of `SET_WEATHER` that equals `"SET_WEATHER"`.
* Create and export a new action creator called `setWeather`:
  * This function should take a single parameter called `weatherPromise`.
  * This function should `return` an object with two properties:
    * `type` - This should equal our action type: `SET_WEATHER`.
    * `payload` - This should equal the promise we get as a parameter: `weatherPromise`.
* Update the `reducer` to handle the `SET_WEATHER` action:
  * When the action type is `SET_WEATHER + "_PENDING"`:
    * <details>
      <summary> <code> Object </code> </summary>

      ```js
      return {
        error: false, 
        loading: true,
        search: false, 
        weather: {}
      };
      ```
      </details>
  * When the action type is `SET_WEATHER + "_FULFILLED"`:
    * <details>
      <summary> <code> Object </code> </summary>

      ```js
      return {
        error: false, 
        loading: false,
        search: false,
        weather: action.payload
      };
      ```
      </details>
  * When the action type is `SET_WEATHER + "_REJECTED"`:
    * <details>
      <summary> <code> Object </code> </summary>

      ```js
      return {
        error: true,
        loading: false,
        search: false,
        weather: {}
      };
      ```
      </details>

### Solution

<details>

<summary> <code> src/ducks/weather.js </code> </summary>

```js
const RESET = "RESET";
const SET_WEATHER = "SET_WEATHER";

const initialState = {
  error: false,
  loading: false,
  search: true,
  weather: {}
};

export default function weather( state = initialState, action ) {
  switch ( action.type ) {
    case RESET: 
      return initialState;

    case SET_WEATHER + "_PENDING":
      return {
        error: false, 
        loading: true,
        search: false, 
        weather: {}
      }

    case SET_WEATHER + "_FULFILLED":
      return {
        error: false, 
        loading: false,
        search: false,
        weather: action.payload
      }

    case SET_WEATHER + "_REJECTED":
      return {
        error: true,
        loading: false,
        search: false,
        weather: {}
      }

    default: 
      return state;
  }
}

export function reset() {
  return { type: RESET };
}

export function setWeather( weatherPromise ) {
  return {
    type: SET_WEATHER,
    payload: weatherPromise
  }
}
```

</details>

## Step 3

### Summary

In this step, we will create a file that contains and exports our API Key from `OpenWeatherMap`.

### Instructions

* Create a new file in `src` named `apiKey.js`.
* In `src/apiKey.js` export default your API Key in a string.
  * You can locate your API Key <a href="https://home.openweathermap.org/api_keys">here</a> after you've signed up and logged in.

### Solution

<details>

<summary> <code> src/apiKey.js </code> </summary>

```js
export default "API_KEY_HERE";
```

</details>

## Step 4

### Summary

In this step, we will update our `weatherUtils` file to handle constructing a URL that will be used to call the `OpenWeatherMap` API.

### Instructions

* Open `src/utils/weatherUtils.js`.
* Import `API_KEY` from `src/apiKey.js`.
* Create a variable called `BASE_URL` that equals:
  * ``` `http://api.openweathermap.org/data/2.5/weather?APPID=${ API_KEY }&units=imperial&` ```
* Modify the `buildUrl` function at the bottom to do the following:
  * This functions should check if `location` is a zip code using the `isZip` function.
  * If `location` is a zip code return ```BASE_URL + `zip=${ location }` ```
  * If `location` is not a zip code return ```BASE_URL + `q=${ location }` ```

### Solution

<details>

<summary> <code> src/utils/weatherUtils.js </code> </summary>

```js
import cloudy from "../assets/cloudy.svg";
import partlyCloudy from "../assets/partly-cloudy.svg";
import rainy from "../assets/rainy.svg";
import snowy from "../assets/snowy.svg";
import sunny from "../assets/sunny.svg";
import unknownIcon from "../assets/unknown-icon.svg";

import API_KEY from "../apiKey";
const BASE_URL = `http://api.openweathermap.org/data/2.5/weather?APPID=${ API_KEY }&units=imperial&`

function isZipCode( location ) {
  return !isNaN( parseInt( location ) );
}

function getWeatherIcon( conditionCode ) {
  if ( conditionCode === 800 ) {
    return sunny;
  }

  if ( conditionCode >= 200 && conditionCode < 600 ) {
    return rainy;
  }

  if ( conditionCode >= 600 && conditionCode < 700 ) {
    return snowy;
  }

  if ( conditionCode >= 801 && conditionCode <= 803 ) {
    return partlyCloudy;
  }

  if ( conditionCode === 804 ) {
    return cloudy;
  }

  return unknownIcon;
}

export function formatWeatherData( weatherData ) {
  return {
    icon: getWeatherIcon( weatherData.weather[ 0 ].id ),
    currentTemperature: weatherData.main.temp,
    location: weatherData.name,
    maxTemperature: weatherData.main.temp_max,
    minTemperature: weatherData.main.temp_min,
    humidity: weatherData.main.humidity,
    wind: weatherData.wind.speed
  };
}

export function buildUrl( location ) {
  if ( isZipCode( location ) ) {
    return BASE_URL + `zip=${ location }`;
  }

  return BASE_URL + `q=${ location }`;
}
```

</details>

## Step 5

### Summary

In this step, we will fetch the weather data from `OpenWeatherMap`'s API and place it on application state.

### Instructions

* Open `src/services/weatherService.js`.
* Import `setWeather` from `src/ducks/weather.js`.
* Modify the `getWeather` function:
  * This function should create a variable named `weatherPromise` that should equal:
    * <details>
      <summary> <code> weatherPromise </code> </summary>

      ```js
      const weatherPromise = axios.get( buildUrl(location) ).then(response => {
        console.log( response );

        const formattedData = formatWeatherData( response.data );
        console.log( formattedData );

        return formattedData;
      });
      ```
      </details>
  * This function should then dispatch our `setWeather` action creator with our newly created promise as the parameter.
* Open `src/components/EnterLocation/EnterLocation.js`.
* Import `getWeather` from `src/services/weatherService.js`.
* Modify the `handleSubmit` method:
  * This method should call `getWeather` and pass in `this.state.location`.

Try entering in a zip code or location in the interface and press submit. You should now see `console.logs` appear in the debugger console. Let's pause and take a look at how the data will be flowing here.

<img src="https://raw.githubusercontent.com/DevMountain/weatherman/master/readme-assets/data-flow.png" />

### Solution

<details>

<summary> <code> src/services/weatherService.js </code> </summary>

```js
import axios from "axios";
import { setWeather } from '../ducks/weather';
import store from "../store";

import {
  formatWeatherData,
  buildUrl
} from "../utils/weatherUtils";


export function getWeather( location ) {
  const weatherPromise = axios.get( buildUrl(location) ).then(response => {
    console.log( response );

    const formattedData = formatWeatherData( response.data );
    console.log( formattedData );

    return formattedData;
  });

  store.dispatch( setWeather( weatherPromise ) );
}
```

</details>

<details>

<summary> <code> src/components/EnterLocation/EnterLocation.js </code> </summary>

```jsx
import React, { Component } from "react";
import { getWeather } from '../../services/weatherService';

import "./EnterLocation.css";

export default class EnterLocation extends Component {
  constructor( props ) {
    super( props );

    this.state = { location: "" };

    this.handleChange = this.handleChange.bind( this );
    this.handleSubmit = this.handleSubmit.bind( this );
  }

  handleChange( event ) {
    this.setState( { location: event.target.value } );
  }

  handleSubmit( event ) {
    event.preventDefault();

    getWeather( this.state.location );

    this.setState( { location: "" } );
  }

  render() {
    return (
      <form
        className="enter-location"
        onSubmit={ this.handleSubmit }
      >
        <input
          className="enter-location__input"
          onChange={ this.handleChange }
          placeholder="London / 84601"
          type="text"
          value={ this.state.location }
        />
        <button
          className="enter-location__submit"
        >
          Submit
        </button>
      </form>
    );
  }
}
```

</details>

## Step 6

### Summary

In this step, we will be displaying all the different child components based on application state. 

* If `props.error` is truthy, we will render the `ErrorMessage` component with a reset prop equal to our `reset` action creator.
* If `props.loading` is truthy, we will render an image with a `src` prop equal to `hourglass`. `hourglass` is an animated loading indicator.
* If `props.search` is truthy, we will render the `EnterLocation` component.
* If none of those are truthy, we will render the `CurrentWeather` component with a reset prop equal to our `reset` action creator and a weather prop equal to `weather` off of props.

### Instructions

* Open `src/App.js`.
* Create a method above the `render` method called `renderChildren`:
  * This method should deconstruct `props` for simplified referencing.
  * This method should selectively render a component based on the conditions specified in the summary.
* Replace `<EnterLocation />` in the render method with the invocation of `renderChildren`. 

### Solution

<details>

<summary> <code> src/App.js </code> </summary>

```jsx
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
      error,
      loading,
      search,
      weather,
      reset
    } = this.props;

    if ( error ) {
      return <ErrorMessage reset={ reset } />
    }

    if ( loading ) {
      return (
        <img alt="loading indicator" src={ hourglass } />
      )
    }

    if ( search ) {
      return <EnterLocation />
    }

    return (
      <CurrentWeather reset={ reset } weather={ weather } />
    )
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
```

</details>

## Step 7

### Summary

In this step, we will update `CurrentWeather` to display an icon and the actual weather information.

### Detailed Instructions

* Open `src/components/CurrentWeather/CurrentWeather.js`.
* Using the `weather` prop object, replace the static data for location, icon, current temp, max temp, min temp, wind, and humidity.

### Solution

<details>

<summary> <code> src/components/CurrentWeather/CurrentWeather.js </code> </summary>

```jsx
import React, { PropTypes } from "react";

import "./CurrentWeather.css";

export default function CurrentWeather( { weather, reset } ) {
  const {
    currentTemperature,
    humidity,
    icon,
    location,
    maxTemperature,
    minTemperature,
    wind
  } = weather;
  return (
    <div className="current-weather">
      <div className="current-weather__weather">
        <h3 className="current-weather__location"> { location } </h3>
        <img
          alt="current weather icon"
          className="current-weather__icon"
          src={ icon }
        />
        <h3 className="current-weather__temp"> { currentTemperature }° </h3>

        <div className="current-weather__separator" />

        <ul className="current-weather__stats">
          <li className="current-weather__stat">Max: { maxTemperature }°</li>
          <li className="current-weather__stat">Min: { minTemperature }°</li>
          <li className="current-weather__stat">Wind: { wind } MPH</li>
          <li className="current-weather__stat">Humidity: { humidity }%</li>
        </ul>
      </div>
      <button
        className="current-weather__search-again"
        onClick={ reset }
      >
        Search Again
      </button>
    </div>
  );
  }

  CurrentWeather.propTypes = {
    reset: PropTypes.func.isRequired
  , weather: PropTypes.shape( {
      icon: PropTypes.string.isRequired
    , currentTemperature: PropTypes.number.isRequired
    , maxTemperature: PropTypes.number.isRequired
    , minTemperature: PropTypes.number.isRequired
    , wind: PropTypes.number.isRequired
    , humidity: PropTypes.number.isRequired
  } ).isRequired
};
```

</details>

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
</p>

