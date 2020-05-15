import * as actionTypes from "./actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.EXCHANGE_CITY:
      return {
        ...state,
        from: state.to,
        to: state.from
      };
    case actionTypes.SHOW_SELECT_CITY:
      return {
        ...state,
        isCitySelectorVisible: true,
        isStart: action.isStart
      };
    case actionTypes.HIDE_SELECT_CITY:
      return {
        ...state,
        isCitySelectorVisible: false
      };
    case actionTypes.CITY_DATA_LOADING:
      return {
        ...state,
        isLoadingCityData: action.isLoading
      };
    case actionTypes.GET_CITY_DATA:
      return {
        ...state,
        cityData: action.data
      };
    default:
      return state;
  }
};
