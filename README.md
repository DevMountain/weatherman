<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# Weatherman

<img src="https://raw.githubusercontent.com/DevMountain/weatherman/master/solution.PNG"/>

**Project Summary**

In this project we'll be building a weather app that allows users to search for the current weather anywhere in the world. We'll make use of the [OpenWeatherMap](https://openweathermap.org/) API and [Redux Promise Middleware](https://github.com/pburtchaell/redux-promise-middleware) to accomplish this in a user friendly fashion.

**Setup**

Get started with the usual steps, as well as a new one:

* Fork and clone this repository
* `cd` into the project directory
* `npm i` to install dependencies
* `npm start` to spin up the development server
* **Go to [OpenWeatherMap](https://home.openweathermap.org/users/sign_up) and create an account. You'll need an API key to complete this project.**

### Step 1

**Summary**

In this first step we will be installing new dependencies, customizing the store to handle promises, and adding new actions and handlers to the reducer.

**Detailed Instructions**

Begin by `npm install`ing the following dependencies:

* [`redux-promise-middleware`](https://github.com/pburtchaell/redux-promise-middleware) - A module that changes how redux handles promises.
* [`axios`](https://github.com/mzabriskie/axios) - A module that allows us to make HTTP requests

Once those complete, open up `src/store.js` and import `promiseMiddleware` from Redux Promise Middleware and `applyMiddleware` from Redux. To let our `store` make use of this middleware we need to change how we call `createStore`. Pass two new arguments after the reducer:

* `{}` - An empty object. This could be an initial state, but we handle that in our reducer, so we aren't worried about this.
* `applyMiddleware` - Invoke this, and pass `promiseMiddleware()` as the only argument. This will tell Redux that we want the middleware called on every action that is `dispatch`ed.

The store is set up! Let's go add some actions to our reducer in `src/ducks/weather.js`. First off create a new action type of `SET_WEATHER` at the top of the file. Now we need a corresponding action creator, create and export a  function `setWeather` which takes a single parameter `weatherPromise`. This function should return an object where `type` is `FETCH_WEATHER` and `payload` is `weatherPromise`.

We need to update the reducer to handle the new action, but because Redux Promise Middleware adjusts the action `type` we have to do it a little differently than normal. The first `case` should check if `action.type` is equal to `SET_WEATHER + "_PENDING"`, the middleware will add `_PENDING` for us while we wait for the promise to resolve. When this `case` is true, return a new object that looks something like this:

```javascript
return {
	  error: false // We can't have an error yet because we're still waiting on the promise
	, loading: true // We're now waiting on data, so we should indicate to the user that something is loading
	, search: false // The use has just entered their search, so we can hide the search box now
	, weather: {} // This is where the data will live once it comes back to us
};
```

The next `case` needs to check for `SET_WEATHER + "_FULFILLED"`, the type dispatched by the middleware when our promise succesfully completed. In this `case`, return an object that looks like this:

```javascript
return {
	  error: false // Fulfilled only fires on succesfull completion
	, loading: false // We've now finished fetching the data
	, search: false // We'll be displaying the weather data instead of the search box
	, weather: action.payload // Once the promise completes the middleware will place the returned data onto `action.payload`
};
```

The final `case` to check is `SET_WEATHER + "_REJECTED"`, rejected means something went wrong with the promise and we have an error instead of data.

```javascript
return {
	  error: true
	, loading: false
	, search: false
	, weather: {}
};
```

That's it for this step! Next up we'll make use of our new actions.

<details>

<summary><b>Code Solution</b></summary>


<details>

<summary><code>src/store.js</code></summary>

```javascript
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import weather from "./ducks/weather";

export default createStore( weather, {}, applyMiddleware( promiseMiddleware() ) );
```


</details>

<details>

<summary><code>src/ducks/weather.js</code></summary>

```javascript
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
		case SET_WEATHER + "_FULFULLED":
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
```

</details>

</details>

### Step 2

**Summary**

In this step we will actually fetch the weather data, as well as display our loading indicator.

**Detailed Instructions**

To start this step, create a new file in `src` named `apiKey.js`. You might note that `apiKey.js` is in the `.gitignore`, this is because API keys are something that should be kept secret! If your API key ends up on GitHub anyone could use it! `src/apiKey.js` should simply `export default "YOUR_API_KEY_HERE"`. You can find your API key on the OpenWeatherMap account page under the "API keys" tab.

Next, open up `src/utils/weatherUtils.js`. This file contains a handful of helper functions for formatting data. Go ahead and import `API_KEY` from `src/apiKey.js`. Create a new variable named `BASE_URL` and set it equal to the string `http://api.openweathermap.org/data/2.5/weather?APPID=${ API_KEY }&units=imperial&`. It's good practice to set up a base URL like this, now we don't have to worry about changing it in a dozen places if the URL ever changes!

Near the bottom of the file there is an incomplete `buildUrl` function, let's update it to actually do things. We want users to be able to search by zip code or by city name but they require different URL's. Using the (rudimentary) `isZip` function check whether the `location` parameter is a zip code. If `location` is a zip code return ```BASE_URL + `zip=${ location }` ``` otherwise return ```BASE_URL + `q=${ location }` ```.

Now that we are ready to build a URL, open up `src/services/weatherService.js` where we'll be making the HTTP request. Inside of the `getWeather` function create a variable named `weatherPromise` and set it equal to the following:

```javascript
const weatherPromise = axios.get( buildUrl )
	.then( response => {
		console.log( response );

		const formattedData = formatWeatherData( response );
		console.log( formattedData );

		return formattedData;
	} );
```

Here we make a request to get some data, and use `.then` to run a callback function at some point in the future when the data comes back. In the callback function we log out the response to get an idea of what the data looks like by default, then we adjust it to match the structure we need using the `formatWeatherData` function from `src/utils/weatherUtils.js`, finally we return the data.

Now that we have our promise of data we can dispatch it to the middleware and reducer. Invoke `store.dispatch` passing `setWeather( weatherPromise )`. Let's pause and take a look at how the data is flowing here.
















## Contributions

### Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

### Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">