import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import weather from "./ducks/weather";

const composeStoreWithMiddleware = applyMiddleware( promiseMiddleware() )( createStore );

export default composeStoreWithMiddleware( weather );
