import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import "normalize.css/normalize.css"; //统一各个浏览器样式

import "./index.css";
import store from "./store";
import * as serviceWorker from "../serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById("root")
);

if ("production" === process.env.NODE_ENV) {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}
