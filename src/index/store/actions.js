import * as actionTypes from "./actionTypes";

export const exchangeFromTo = () => ({
  type: actionTypes.EXCHANGE_CITY
});

export const showCitySelector = (isStart) => ({
  type: actionTypes.SHOW_SELECT_CITY,
  isStart
});
