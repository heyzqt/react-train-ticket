import React, { useCallback, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./App.css";
import URI from "urijs";
import axios from "axios";
import { ticketUrl } from "../ticket/api/api";
import dayjs from "dayjs";
import { h0 } from "../common/fp";
import useNav from "../common/useNav";

import Header from "../common/Header";
import Detail from "../common/Detail";
import Candidate from "./Candidate";
import Nav from "../common/Nav";

import {
  setDepartDate,
  setArriveDate,
  setDepartTimeStr,
  setArriveTimeStr,
  setDepartStation,
  setArriveStation,
  setTrainNum,
  setTickets,
  setDurationStr,
  setSearchParsed,
  toggleIsScheduleVisible,
  prevDate,
  nextDate
} from "./actions";
import { useMemo } from "react";
import { TrainContext } from "./context";

//车票详情页实现思路
//UI：Header、时间栏、车票详情、座位等级
//UI难点：座位等级的伸缩动画
//数据：
//出发日期
//到达日期
//出发时间点
//到达时间点
//出发站台
//到达站台
//列车号码
//座位等级列表数据
//是否解析url参数完成
//是否显示列车时刻表弹窗
//业务逻辑：
//请求数据获取当前车票信息，请求参数：出发日期、出发到达站台
//点击预定显示预定列表
//点击买票跳转到订单填写页

//开发一
//+ 解析URL参数
//+ 网络请求获取数据
//+ 完成Header和Nav

function App(props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    departStation,
    arriveStation,
    trainNum,
    tickets,
    durationStr,
    searchParsed,
    isScheduleVisible,

    dispatch
  } = props;

  //解析url参数
  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const { aStation, dStation, date, trainNumber } = queries;

    dispatch(setDepartStation(dStation));
    dispatch(setArriveStation(aStation));
    dispatch(setTrainNum(trainNumber));
    dispatch(setDepartDate(h0(date)));

    dispatch(setSearchParsed(true));
  }, [dispatch]);

  //设置网页标题
  useEffect(() => {
    document.title = trainNum;
  }, [trainNum]);

  //网络请求数据
  useEffect(() => {
    if (!searchParsed) {
      return;
    }

    axios
      .get(
        ticketUrl +
          "?date=" +
          dayjs(departDate).format("YYYY-MM-DD") +
          "&trainNumer=" +
          trainNum
      )
      .then((resp) => {
        const { detail, candidates } = resp.data;

        const {
          departTimeStr,
          arriveTimeStr,
          arriveDate,
          durationStr
        } = detail;
        dispatch(setDepartTimeStr(departTimeStr));
        dispatch(setArriveTimeStr(arriveTimeStr));
        dispatch(setArriveDate(arriveDate));
        dispatch(setDurationStr(durationStr));
        dispatch(setTickets(candidates));
      });
  }, [departDate, dispatch, searchParsed, trainNum]);

  const { prev, next, isPrevDisabled, isNextDisabled } = useNav(
    departDate,
    prevDate,
    nextDate,
    dispatch
  );

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  const detailCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggleIsScheduleVisible
      },
      dispatch
    );
  }, [dispatch]);

  const Schedule = lazy(() => import("./Schedule"));

  if (!searchParsed) {
    return <div>loading</div>;
  }

  return (
      <div>
          <Header title={trainNum} onBack={onBack}></Header>
          <Nav
        date={departDate}
        prev={prev}
        next={next}
        isPrevDisabled={isPrevDisabled}
        isNextDisabled={isNextDisabled}
      ></Nav>
          <Detail
        departDate={departDate}
        arriveDate={arriveDate}
        departTimeStr={departTimeStr}
        arriveTimeStr={arriveTimeStr}
        departStation={departStation}
        arriveStation={arriveStation}
        trainNumber={trainNum}
        durationStr={durationStr}
        {...detailCbs}
      >
              <span className="left"></span>
              <span className="schedule">时刻表</span>
              <span className="right"></span>
          </Detail>
          <TrainContext.Provider
        value={{
          trainNum,
          departStation,
          arriveStation,
          departDate
        }}
      >
              <Candidate tickets={tickets}></Candidate>
          </TrainContext.Provider>
          {isScheduleVisible && (
          <Suspense fallback={<div>Schedule Loading</div>}>
              <Schedule
            date={departDate}
            trainNumber={trainNum}
            departStation={departStation}
            arriveStation={arriveStation}
            {...detailCbs}
          ></Schedule>
          </Suspense>
      )}
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
