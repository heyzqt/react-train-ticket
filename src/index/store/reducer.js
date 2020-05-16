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
        isClickFrom: action.isClickFrom
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
    case actionTypes.SET_FROM_CITY:
      return {
        ...state,
        from: action.from
      };
    case actionTypes.SET_TO_CITY:
      return {
        ...state,
        to: action.to
      };
    default:
      return state;
  }
};
