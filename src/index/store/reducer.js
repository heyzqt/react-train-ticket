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
    default:
      return state;
  }
};
