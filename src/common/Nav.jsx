import React, { memo } from "react";
import "./Nav.scss";
import PropTypes from "prop-types";
import { h0 } from "../common/fp";
import dayjs from "dayjs";
import "dayjs/locale/zh";
import classnames from "classnames";

//Nav日期导航实现思路
//UI：前一天、后一天、当天日期+周几
//数据：当天date、前一天是否可点击、后一天是否可点击
//逻辑：
//1.点击前一天，时间减一天，当前一天在当天以前则不可点击
//2.点击加一天，时间加一天，当购票时间在20天内是可以点击，超过了不可点击

function Nav(props) {
  const { date, prev, next, isPrevDisabled, isNextDisabled } = props;

  const currentDay =
    dayjs(h0(date)).format("M月D日") +
    " " +
    dayjs(h0(date)).locale("zh").format("dddd");

  return (
      <div className="nav">
          <span
        onClick={prev}
        className={classnames("nav-prev", { "nav-disabled": isPrevDisabled })}
      >
              前一天
          </span>
          <span className="nav-current">{currentDay}</span>
          <span
        onClick={next}
        className={classnames("nav-next", { "nav-disabled": isNextDisabled })}
      >
              后一天
          </span>
      </div>
  );
}

Nav.propTypes = {
  date: PropTypes.number.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  isPrevDisabled: PropTypes.bool.isRequired,
  isNextDisabled: PropTypes.bool.isRequired
};

export default memo(Nav);
