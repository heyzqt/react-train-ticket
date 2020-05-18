import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import reducers from "./reducer";
import thunk from "redux-thunk";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  reducers,
  {
    from: "深圳",
    to: "成都",
    isCitySelectorVisible: false,
    isLoadingCityData: false,
    cityData: null,
    departDate: Date.now(),
    isDateSelectorVisible: false,
    highSpeed: false
  },
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
