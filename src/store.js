import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import weather from "./ducks/weather";

export default createStore( weather, undefined, applyMiddleware( promiseMiddleware() ) );

