import React from "react";
import "./Bottom.scss";
import PropTypes from "prop-types";
import { ORDER_PART } from "./constant";
import classnames from "classnames";

//底部筛选栏实现思路
//UI:底部栏固定、出发早晚、只看高铁动车、只看有票、综合筛选
//数据：
//第一组数据：出发早晚/短长状态类型string、只看高铁动车bool、只看有票bool、综合筛选bool，以及改变这4个数据对应的函数func
//第二组数据在综合筛选浮层中：坐席类型（选中的坐席类型）、车次类型（选中的车次类型）、出发车站、选中的出发车站、到达车站、选中的到达车站、
//出发时间起始时间、出发时间终点时间、到达时间起始时间、到达时间终点时间
//逻辑：
//1.第一组数据切换后：重新网络请求获取新的列车数据
//2.综合筛选浮层页：重置业务数据、确定保存筛选结果，重新网络请求获取新的列车数据

function Bottom(props) {
  const {
    orderType,
    highSpeed,
    onlyTickets,
    isFilterVisible,
    toggleOrderType,
    toggleHighSpeed,
    toggleOnlyTickets,
    toggleIsFilterVisible
  } = props;

  return (
    <div className="bottom">
      <div className="bottom-filters">
        <span className="item" onClick={toggleOrderType}>
          <i className="icon">&#xf065;</i>
          {orderType === ORDER_PART ? "出发 早->晚" : "耗时 短->长"}
        </span>
        <span
          className={classnames("item", { "item-on": highSpeed })}
          onClick={toggleHighSpeed}
        >
          <i className="icon">{highSpeed ? "\uf43f" : "\uf43e"}</i>
          只看高铁动车
        </span>
        <span
          className={classnames("item", { "item-on": onlyTickets })}
          onClick={toggleOnlyTickets}
        >
          <i className="icon">{onlyTickets ? "\uf43d" : "\uf43c"}</i>
          只看有票
        </span>
        <span
          className={classnames("item", { "item-on": isFilterVisible })}
          onClick={toggleIsFilterVisible}
        >
          <i className="icon">{"\uf0f7"}</i>
          综合筛选
        </span>
      </div>
    </div>
  );
}

Bottom.propTypes = {
  orderType: PropTypes.number.isRequired,
  highSpeed: PropTypes.bool.isRequired,
  onlyTickets: PropTypes.bool.isRequired,
  isFilterVisible: PropTypes.bool.isRequired,
  toggleOrderType: PropTypes.func.isRequired,
  toggleHighSpeed: PropTypes.func.isRequired,
  toggleOnlyTickets: PropTypes.func.isRequired,
  toggleIsFilterVisible: PropTypes.func.isRequired
};

export default Bottom;
