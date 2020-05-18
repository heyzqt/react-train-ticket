import * as actionTypes from "./actionTypes";
import axios from "axios";
import { api } from "../api/index";

export const exchangeFromTo = () => ({
  type: actionTypes.EXCHANGE_CITY
});

export const showCitySelector = (isClickFrom) => ({
  type: actionTypes.SHOW_SELECT_CITY,
  isClickFrom
});

export const hideCitySelector = () => ({
  type: actionTypes.HIDE_SELECT_CITY
});

const setLoading = (isLoading) => ({
  type: actionTypes.CITY_DATA_LOADING,
  isLoading
});

const setCityData = (data) => ({
  type: actionTypes.GET_CITY_DATA,
  data
});

export const fetchCityData = () => {
  return (dispatch, getState) => {
    const { isLoadingCityData } = getState();

    if (isLoadingCityData) {
      return;
    }

    const cache = JSON.parse(localStorage.getItem("city_data_cache") || "{}");
    if (Date.now() <= cache.expires) {
      dispatch(setCityData(cache.data));
      return;
    }

    dispatch(setLoading(true));
    axios
      .get(api.getCityData + "?timestamp=" + Date.now())
      .then((res) => {
        localStorage.setItem(
          "city_data_cache",
          JSON.stringify({
            expires: Date.now() + 60 * 1000, //设置1分钟的过期时间
            data: res.data
          })
        );
        dispatch(setCityData(res.data));
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  };
};

export const setSelectedCity = (name) => {
  return (dispatch, getState) => {
    const { isClickFrom } = getState();
    if (isClickFrom) {
      dispatch(setFromCity(name));
    } else {
      dispatch(setToCity(name));
    }
    dispatch(hideCitySelector());
  };
};

const setFromCity = (from) => ({
  type: actionTypes.SET_FROM_CITY,
  from
});

const setToCity = (to) => ({
  type: actionTypes.SET_TO_CITY,
  to
});

export const showDateSelector = () => ({
  type: actionTypes.SHOW_DATE_SELECTOR
});

export const hideDateSelector = () => ({
  type: actionTypes.HIDE_DATE_SELECTOR
});

export const setDepartDate = (day) => ({
  type: actionTypes.SET_DEPART_DATE,
  departDate: day
});

export const toggleHighSpeed = () => ({
  type: actionTypes.TOGGLE_HIGH_SPEED
});
