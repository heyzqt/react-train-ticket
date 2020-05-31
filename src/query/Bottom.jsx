import React, { memo, useState, useCallback } from "react";
import "./Bottom.scss";
import PropTypes from "prop-types";
import { ORDER_PART } from "./constant";
import classnames from "classnames";
import {
  setTicketTypes,
  setTrainTypes,
  setDepartStations,
  setArriveStations,
} from "./actions";

import Slider from "./slider";

//底部筛选栏实现思路
//UI:底部栏固定、出发早晚、只看高铁动车、只看有票、综合筛选
//数据：
//第一组数据：出发早晚/短长状态类型string、只看高铁动车bool、只看有票bool、综合筛选bool，以及改变这4个数据对应的函数func
//第二组数据在综合筛选浮层中：坐席类型（选中的坐席类型）、车次类型（选中的车次类型）、出发车站、选中的出发车站、到达车站、选中的到达车站、
//出发时间起始时间、出发时间终点时间、到达时间起始时间、到达时间终点时间
//逻辑：
//1.第一组数据切换后：重新网络请求获取新的列车数据
//2.综合筛选浮层页：重置业务数据、确定保存筛选结果，重新网络请求获取新的列车数据

//综合筛选浮层实现思路
//数据：坐席类型（选中的坐席类型）、车次类型（选中的车次类型）、出发车站、选中的出发车站、到达车站、选中的到达车站、
//出发时间起始时间、出发时间终点时间、到达时间起始时间、到达时间终点时间
//浮层中的缓存数据：选中的坐席类型、选中的车次类型、出发车站、到达车站
//逻辑：
//1.更新以上array数据类型的选中的update方法

const Filter = memo(function Filter(props) {
  const { value, name, checked, toggle } = props;

  return (
    <li className={classnames({ checked })} onClick={() => toggle(value)}>
      {name}
    </li>
  );
});

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

const Option = memo(function Option(props) {
  const { title, options, checkedMap, update } = props;

  const toggle = useCallback(
    (value) => {
      const newCheckedMap = { ...checkedMap };
      if (value in newCheckedMap) {
        delete newCheckedMap[value];
      } else {
        newCheckedMap[value] = true;
      }
      update(newCheckedMap);
    },
    [checkedMap, update]
  );

  return (
    <div className="option">
      <h3>{title}</h3>
      <ul>
        {options.map((option) => {
          return (
            <Filter
              key={option.value}
              {...option}
              checked={option.value in checkedMap}
              toggle={toggle}
            />
          );
        })}
      </ul>
    </div>
  );
});

Option.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  checkedMap: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
};

const BottomModal = memo(function BottomModal(props) {
  const {
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
  } = props;

  const [localCheckedTicketTypes, setLocalCheckedTicketTypes] = useState(
    checkedTicketTypes
  );
  const [localCheckedTrainTypes, setLocalCheckedTrainTypes] = useState(
    checkedTrainTypes
  );
  const [localCheckedDepartStations, setLocalCheckedDepartStations] = useState(
    checkedDepartStations
  );
  const [localCheckedArriveStations, setLocalCheckedArriveStations] = useState(
    checkedArriveStations
  );

  const optionGroup = [
    {
      title: "坐席类型",
      options: ticketTypes,
      checkedMap: localCheckedTicketTypes,
      update: setLocalCheckedTicketTypes,
    },
    {
      title: "车次类型",
      options: trainTypes,
      checkedMap: localCheckedTrainTypes,
      update: setLocalCheckedTrainTypes,
    },
    {
      title: "出发车站",
      options: departStations,
      checkedMap: localCheckedDepartStations,
      update: setLocalCheckedDepartStations,
    },
    {
      title: "到达车站",
      options: arriveStations,
      checkedMap: localCheckedArriveStations,
      update: setLocalCheckedArriveStations,
    },
  ];

  return (
    <div className="bottom-modal">
      <div className="bottom-dialog">
        <div className="bottom-dialog-content">
          <div className="title">
            <span className={classnames("reset")}>重置</span>
            <span className="ok">确定</span>
          </div>
          <div className="options">
            {optionGroup.map((group) => (
              <Option {...group} key={group.title} />
            ))}
          </div>
          <Slider></Slider>
        </div>
      </div>
    </div>
  );
});

BottomModal.propTypes = {
  ticketTypes: PropTypes.array.isRequired,
  trainTypes: PropTypes.array.isRequired,
  departStations: PropTypes.array.isRequired,
  arriveStations: PropTypes.array.isRequired,
  checkedTicketTypes: PropTypes.object.isRequired,
  checkedTrainTypes: PropTypes.object.isRequired,
  checkedDepartStations: PropTypes.object.isRequired,
  checkedArriveStations: PropTypes.object.isRequired,
};

function Bottom(props) {
  const {
    orderType,
    highSpeed,
    onlyTickets,
    isFilterVisible,
    toggleOrderType,
    toggleHighSpeed,
    toggleOnlyTickets,
    toggleIsFilterVisible,

    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
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
      {isFilterVisible && (
        <BottomModal
          ticketTypes={ticketTypes}
          trainTypes={trainTypes}
          departStations={departStations}
          arriveStations={arriveStations}
          checkedTicketTypes={checkedTicketTypes}
          checkedTrainTypes={checkedTrainTypes}
          checkedDepartStations={checkedDepartStations}
          checkedArriveStations={checkedArriveStations}
          departTimeStart={departTimeStart}
          departTimeEnd={departTimeEnd}
          arriveTimeStart={arriveTimeStart}
          arriveTimeEnd={arriveTimeEnd}
        />
      )}
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
  toggleIsFilterVisible: PropTypes.func.isRequired,
  ticketTypes: PropTypes.array.isRequired,
  trainTypes: PropTypes.array.isRequired,
  departStations: PropTypes.array.isRequired,
  arriveStations: PropTypes.array.isRequired,
  checkedTicketTypes: PropTypes.object.isRequired,
  checkedTrainTypes: PropTypes.object.isRequired,
  checkedDepartStations: PropTypes.object.isRequired,
  checkedArriveStations: PropTypes.object.isRequired,
  departTimeStart: PropTypes.number.isRequired,
  departTimeEnd: PropTypes.number.isRequired,
  arriveTimeStart: PropTypes.number.isRequired,
  arriveTimeEnd: PropTypes.number.isRequired,
};

export default Bottom;
