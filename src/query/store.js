import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";

import { h0 } from "../common/fp";
import { ORDER_PART } from "./constant";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  combineReducers(reducer),
  {
    from: null,
    to: null,
    departDate: h0(Date.now()),
    trainList: [],
    orderType: ORDER_PART,
    highSpeed: false,
    onlyTickets: false, //只看有票
    ticketTypes: [], //坐席类型
    checkedTicketTypes: {}, //选中的坐席类型
    trainTypes: [], //车次类型
    checkedTrainTypes: {},
    departStations: [], //出发车站
    checkedDepartStations: {},
    arriveStations: [], //到达车站
    checkedArriveStations: {},
    departTimeStart: 0, //出发开始时间
    departTimeEnd: 24, //出发离开时间
    arriveTimeStart: 0, //到达开始时间
    arriveTimeEnd: 24, //到达离开时间
    isFilterVisible: false, //是否显示筛选框
    searchParsed: false //是否解析完url
  },
  composeEnhancers()
);

export default store;
