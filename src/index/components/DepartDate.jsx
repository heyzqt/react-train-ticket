//日期控件开发思路
//数据：
//1. 将时间处理成需要的“年-月-日”格式(todo，可以使用Date直接生成对应格式吗)
//视图
//1. 函数组件DepartDate组件显示时间，需要的参数是时间和回调函数
//2. 显示周几
//3. 显示今天
//App.js：在火车票首页显示时间控件
import React, { useMemo } from "react";
import { h0 } from "../../common/fp";
import dayjs from "dayjs";
import PropTypes from "prop-types";

function DepartDate(props) {
  const { time, onClick } = props;

  const h0OfDepart = h0(time);
  const h0OfDepartDate = new Date(h0OfDepart);
  const departDateString = useMemo(() => {
    return dayjs(h0OfDepart).format("YYYY-MM-DD");
  }, [h0OfDepart]);

  const isToday = h0OfDepart === h0();
  const weekString =
    "周" +
    ["日", "一", "二", "三", "四", "五", "六"][h0OfDepartDate.getDay()] +
    (isToday ? "（今天）" : "");

  return (
    <div className="depart-date" onClick={() => onClick(departDateString)}>
      <input type="hidden" name="time" value={departDateString} />
      {departDateString} <span className="depart-week">{weekString}</span>
    </div>
  );
}

DepartDate.propTypes = {
  time: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default DepartDate;
