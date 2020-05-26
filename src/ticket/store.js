import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  combineReducers(reducers),
  {
    departDate: Date.now(),
    arriveDate: Date.now(),
    departTimeStr: Date.now(),
    arriveTimeStr: Date.now(),
    departStation: null,
    arriveStation: null,
    trainNum: null,
    tickets: [],
    searchParsed: false,
    isScheduleVisible: false
  },
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
