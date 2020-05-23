import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import URI from "urijs";
import { h0 } from "../common/fp";
import axios from "axios";
import { API } from "./api";
import useNav from "../common/useNav";

import Header from "../common/Header";
import Nav from "../common/Nav";
import List from "./List";
import Bottom from "./Bottom";

import {
  setFrom,
  setTo,
  setDepartDate,
  setHighSpeed,
  setSearchParsed,
  setTrainList,
  setTicketTypes,
  setTrainTypes,
  setDepartStations,
  setArriveStations,
  prevDate,
  nextDate
} from "./actions";
import dayjs from "dayjs";

//URL解析与数据请求
//1.添加Header
//2.解析URL参数
//3.使用解析出的URL参数和store保存的参数请求query页数据

function App(props) {
  const {
    from,
    to,
    departDate,
    highSpeed,
    searchParsed,
    orderType,
    onlyTickets,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    dispatch,
    trainList
  } = props;

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const { from, to, time, highSpeed } = queries;

    dispatch(setFrom(from));
    dispatch(setTo(to));
    dispatch(setDepartDate(h0(time)));
    dispatch(setHighSpeed(JSON.parse(highSpeed)));

    dispatch(setSearchParsed(true));
  }, []);

  useEffect(() => {
    if (!searchParsed) {
      return;
    }

    const uri = new URI(API.GET_TRAIN_LIST);
    uri.setSearch("from", from);
    uri.setSearch("to", to);
    uri.setSearch("departDate", dayjs(departDate).format("YYYY-MM-DD"));
    uri.setSearch("highSpeed", highSpeed);
    uri.setSearch("orderType", orderType);
    uri.setSearch("onlyTickets", onlyTickets);
    uri.setSearch("checkedTicketTypes", Object.keys(checkedTicketTypes).join());
    uri.setSearch("checkedTrainTypes", Object.keys(checkedTrainTypes).join());
    uri.setSearch("checkedDepartStations", Object.keys(checkedDepartStations));
    uri.setSearch("checkedArriveStations", Object.keys(checkedArriveStations));
    uri.setSearch("departTimeStart", departTimeStart);
    uri.setSearch("departTimeEnd", departTimeEnd);
    uri.setSearch("arriveTimeStart", arriveTimeStart);
    uri.setSearch("arriveTimeEnd", arriveTimeEnd);
    const url = uri.toString();

    axios.get(url).then((resp) => {
      console.log(resp);
      const {
        dataMap: {
          directTrainInfo: {
            trains,
            filter: { ticketType, trainType, depStation, arrStation }
          }
        }
      } = resp.data;

      dispatch(setTrainList(trains));
      dispatch(setTicketTypes(ticketType));
      dispatch(setTrainTypes(trainType));
      dispatch(setDepartStations(depStation));
      dispatch(setArriveStations(arrStation));
    });
  }, [
    searchParsed,
    from,
    to,
    departDate,
    highSpeed,
    orderType,
    onlyTickets,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd
  ]);

  const { isPrevDisabled, isNextDisabled, prev, next } = useNav(
    departDate,
    prevDate,
    nextDate,
    dispatch
  );

  if (!searchParsed) {
    return <div>loading</div>;
  }

  return (
    <div>
      <Header title={`${from} -> ${to}`} onBack={onBack}></Header>
      <Nav
        date={departDate}
        prev={prev}
        next={next}
        isPrevDisabled={isPrevDisabled}
        isNextDisabled={isNextDisabled}
      ></Nav>
      <List list={trainList}></List>
      <Bottom></Bottom>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
