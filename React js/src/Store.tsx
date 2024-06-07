import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { AuthReducers } from "./redux/Reducer/AuthReducer";

const reducer = combineReducers({
  ...AuthReducers,
})

let initialState = {}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store;
