/**
 * Application redux store
 */
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import initState    from "./initialState";
import rootReducers from "./reducers";

const store = createStore(
    combineReducers( rootReducers ),
    initState,
    applyMiddleware( thunkMiddleware )
);

export default store;