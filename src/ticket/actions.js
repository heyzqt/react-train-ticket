export const ACTION_SET_DEPART_DATE = "ACTION_SET_DEPART_DATE";
export const ACTION_SET_ARRIVE_DATE = "ACTION_SET_ARRIVE_DATE";
export const ACTION_SET_DEPART_TIME_STR = "ACTION_SET_DEPART_TIME_STR";
export const ACTION_SET_ARRIVE_TIME_STR = "ACTION_SET_ARRIVE_TIME_STR";
export const ACTION_SET_DEPART_STATION = "ACTION_SET_DEPART_STATION";
export const ACTION_SET_ARRIVE_STATION = "ACTION_SET_ARRIVE_STATION";
export const ACTION_SET_TRAIN_NUM = "ACTION_SET_TRAIN_NUM";
export const ACTION_SET_TICKETS = "ACTION_SET_TICKETS";
export const ACTION_SET_SEARCH_PARSED = "ACTION_SET_SEARCH_PARSED";
export const ACTION_SET_IS_SCHEDULE_VISIBLE = "ACTION_SET_IS_SCHEDULE_VISIBLE";

export function setDepartDate(departDate) {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: departDate
  };
}
export function setArriveDate(arriveDate) {
  return {
    type: ACTION_SET_ARRIVE_DATE,
    payload: arriveDate
  };
}
export function setDepartTimeStr(departTimeStr) {
  return {
    type: ACTION_SET_DEPART_TIME_STR,
    payload: departTimeStr
  };
}
export function setArriveTimeStr(arriveTimeStr) {
  return {
    type: ACTION_SET_ARRIVE_TIME_STR,
    payload: arriveTimeStr
  };
}
export function setDepartStation(departStation) {
  return {
    type: ACTION_SET_DEPART_STATION,
    payload: departStation
  };
}
export function setArriveStation(arriveStation) {
  return {
    type: ACTION_SET_ARRIVE_STATION,
    payload: arriveStation
  };
}
export function setTrainNum(trainNum) {
  return {
    type: ACTION_SET_TRAIN_NUM,
    payload: trainNum
  };
}
export function setTickets(tickets) {
  return {
    type: ACTION_SET_TICKETS,
    payload: tickets
  };
}
function setSearchParsed(searchParsed) {
  return {
    type: ACTION_SET_SEARCH_PARSED,
    payload: searchParsed
  };
}
export function toggleSearchParsed() {
  return (dispatch, getState) => {
    const { searchParsed } = getState();
    dispatch(setSearchParsed(!searchParsed));
  };
}
function setIsScheduleVisible(isScheduleVisible) {
  return {
    type: ACTION_SET_IS_SCHEDULE_VISIBLE,
    payload: isScheduleVisible
  };
}
export function toggleIsScheduleVisible() {
  return (dispatch, getState) => {
    const { isScheduleVisible } = getState();
    dispatch(setIsScheduleVisible(!isScheduleVisible));
  };
}
