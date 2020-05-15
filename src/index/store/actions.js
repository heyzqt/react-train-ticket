import * as actionTypes from "./actionTypes";
import axios from "axios";
import { api } from "../api/index";

export const exchangeFromTo = () => ({
  type: actionTypes.EXCHANGE_CITY
});

export const showCitySelector = (isStart) => ({
  type: actionTypes.SHOW_SELECT_CITY,
  isStart
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
