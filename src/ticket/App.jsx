import React, { useCallback } from "react";
import { connect } from "react-redux";
import "./App.css";

import Header from "../common/Header";
import Detail from "../common/Detail";
import Candidate from "./Candidate";
import Nav from "../common/Nav";

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
    searchParsed,
    isScheduleVisible
  } = props;

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <div>
      <Header title="列车号码" onBack={onBack}></Header>
      {/* <Nav></Nav> */}
      <Detail></Detail>
      <Candidate></Candidate>
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
