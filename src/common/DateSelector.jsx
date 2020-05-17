import React from "react";
import classnames from "classnames";
import Header from "./Header";
import PropTypes from "prop-types";
import "./DateSelector.scss";
import { h0 } from "./fp";

// 日期浮层实现逻辑
// 分为月、周、日，3个组件的显示，从上往下包裹，使用表格显示日期浮层
// 1. 表头 + 周一到周日写死显示，周六周日样式特殊处理
// 2. 获取当前月份开始的时间，添加到数组monthSequence中，并添加接下来的2个月份到数组中
// 3. 因为已知当前月份开始的时间，所以可以将该月所有0点时候的天数添加到日子的数组days中
// 4. 因为每月日期不一定都是从表格第1格开始，最后1格结束，所以需要补全1号前面的空格，和最后一天后面的空格
// - 1号前面的空格，如果是周二补全1格，周三补全2格，周四补全3格，周五补全4格，周六补全5格，周日补全6格，
// 根据规律可知非周日补全(day-1)格数，如果是周日补全6格，day取值0-6
// - 最后一天补全的空格，周日补全0格，周六补1格，周五补2格，周四补3格，周三补4格，周二补5格，周一补6格
// 根据规律可知周日补全0格，非周日补全(7-day)格，day取值0-6

// 1. DateSelector中获取月份数据
// 2. Month中获取每月天数数据
// 3. Month中根据天数计算周数数据

function Day(props) {
  const { day, onSelect } = props;

  //时间的显示有以下几种情况：
  // 1.null
  // 2.过去的时间（不能点击）
  // 3.周六周日
  // 4.今天

  if (!day) {
    return <td className="null"></td>;
  }

  const classes = [];
  const now = h0();
  if (day < now) {
    classes.push("disabled");
  }

  if ([6, 0].includes(new Date(day).getDay())) {
    classes.push("weekend");
  }

  const dateString = day === now ? "今天" : new Date(day).getDate();

  return (
    <td className={classnames(classes)} onClick={() => onSelect(day)}>
      {dateString}
    </td>
  );
}

Day.propTypes = {
  day: PropTypes.number,
  onSelect: PropTypes.func.isRequired
};

function Week(props) {
  const { days, onSelect } = props;

  return (
    <tr className="date-table-days">
      {days.map((day, index) => {
        return <Day key={index} day={day} onSelect={onSelect}></Day>;
      })}
    </tr>
  );
}

Week.propTypes = {
  days: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};

function Month(props) {
  const { startingTimeInMonth, onSelect } = props;

  //计算天数
  let days = [];

  const startDay = new Date(startingTimeInMonth);
  const currentDay = new Date(startingTimeInMonth);

  //获取每月对应天数
  while (startDay.getMonth() === currentDay.getMonth()) {
    days.push(currentDay.getTime());
    currentDay.setDate(currentDay.getDate() + 1);
  }

  //计算1号前的空白天数（需要填充空白格子）
  let startEmptyDay = new Array(
    startDay.getDay() ? startDay.getDay() - 1 : 6
  ).fill(null);
  days = startEmptyDay.concat(days);

  //计算最后1天后的空白天数（需要填充空白格子）
  let lastDay = new Date(days[days.length - 1]);
  let endEmptyDay = new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(
    null
  );
  days = days.concat(endEmptyDay);
  //todo 考虑优化，没必要每次在首页时就初始化该组价
  console.log("Month update");

  const weeks = [];
  for (let row = 0; row < days.length / 7; ++row) {
    // 0 - 6
    // 7 - 13
    // 14 - 20
    // 21 - 27
    // 推出添加week的规律
    const week = days.slice(row * 7, (row + 1) * 7);
    weeks.push(week);
  }

  return (
    <table className="date-table">
      <thead>
        <tr>
          <td colSpan="7">
            <h5>
              {startDay.getFullYear()}年{startDay.getMonth() + 1}月
            </h5>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className="data-table-weeks">
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
          <th className="weekend">周六</th>
          <th className="weekend">周日</th>
        </tr>
        {weeks.map((week, index) => {
          return <Week key={index} days={week} onSelect={onSelect}></Week>;
        })}
      </tbody>
    </table>
  );
}

Month.propTypes = {
  startingTimeInMonth: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
};

function DateSelector(props) {
  const { show, onBack, onSelect } = props;

  const now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  now.setDate(1);

  const monthSequence = [now.getTime()];
  monthSequence.push(now.setMonth(now.getMonth() + 1));
  monthSequence.push(now.setMonth(now.getMonth() + 1));

  return (
    <div className={classnames("date-selector", { hidden: !show })}>
      <Header title="日期选择" onBack={onBack}></Header>
      <div className="date-selector-tables">
        {monthSequence.map((month) => {
          return (
            <Month
              key={month}
              startingTimeInMonth={month}
              onSelect={onSelect}
            ></Month>
          );
        })}
      </div>
    </div>
  );
}

DateSelector.propTypes = {
  show: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default DateSelector;
