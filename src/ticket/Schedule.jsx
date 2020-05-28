import React, { memo, useEffect, useState } from "react";
import "./Schedule.scss";
import axios from "axios";
import { scheduleUrl } from "./api/api";
import classnames from "classnames";
import leftPad from "left-pad";
import PropTypes from "prop-types";

const ScheduleRow = memo(function ScheduleRow(props) {
  const {
    index,
    station,
    arriveTime,
    departTime,
    stay,

    isDepartStation,
    isArriveStation,
    beforeDepartStation,
    afterArriveStation,
    isStartStation,
    isEndStation
  } = props;
  return (
    <li>
      <div
        className={classnames("icon", {
          "icon-red": isDepartStation || isArriveStation
        })}
      >
        {isDepartStation ? "出" : isArriveStation ? "到" : leftPad(index, 2, 0)}
      </div>
      <div
        className={classnames("row", {
          grey: beforeDepartStation || afterArriveStation
        })}
      >
        <span
          className={classnames("station", {
            red: isArriveStation || isDepartStation
          })}
        >
          {station}
        </span>
        <span
          className={classnames("arrtime", {
            red: isArriveStation
          })}
        >
          {isStartStation ? "始发站" : arriveTime}
        </span>
        <span
          className={classnames("deptime", {
            red: isDepartStation
          })}
        >
          {isEndStation ? "终到站" : departTime}
        </span>
        <span className="stoptime">
          {isStartStation || isEndStation ? "-" : stay + "分"}
        </span>
      </div>
    </li>
  );
});

ScheduleRow.propTypes = {
  index: PropTypes.number.isRequired,
  station: PropTypes.string.isRequired,
  arriveTime: PropTypes.string,
  departTime: PropTypes.string,
  stay: PropTypes.number,
  isDepartStation: PropTypes.bool.isRequired,
  isArriveStation: PropTypes.bool.isRequired,
  beforeDepartStation: PropTypes.bool.isRequired,
  afterArriveStation: PropTypes.bool.isRequired,
  isStartStation: PropTypes.bool.isRequired,
  isEndStation: PropTypes.bool.isRequired
};

function Schedule(props) {
  const {
    date,
    trainNumber,
    departStation,
    arriveStation,
    toggleIsScheduleVisible
  } = props;

  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    axios
      .get(
        scheduleUrl +
          "?date=" +
          date +
          "&trainNumber=" +
          trainNumber +
          "&departStation=" +
          departStation +
          "&arriveStation=" +
          arriveStation
      )
      .then((resp) => {
        let list = resp.data;
        let departRow;
        let arriveRow;

        for (let index = 0; index < list.length; index++) {
          if (!departRow) {
            if (departStation === list[index].station) {
              departRow = Object.assign(list[index], {
                beforeDepartStation: false,
                isDepartStation: true,
                isArriveStation: false,
                afterArriveStation: false
              });
            } else {
              Object.assign(list[index], {
                beforeDepartStation: true,
                isDepartStation: false,
                isArriveStation: false,
                afterArriveStation: false
              });
            }
          } else if (!arriveRow) {
            if (arriveStation === list[index].station) {
              arriveRow = Object.assign(list[index], {
                beforeDepartStation: false,
                isDepartStation: false,
                isArriveStation: true,
                afterArriveStation: false
              });
            } else {
              Object.assign(list[index], {
                beforeDepartStation: false,
                isDepartStation: false,
                isArriveStation: false,
                afterArriveStation: false
              });
            }
          } else {
            Object.assign(list[index], {
              beforeDepartStation: false,
              isDepartStation: false,
              isArriveStation: false,
              afterArriveStation: true
            });
          }

          //是否是始发站，是否是终点站
          Object.assign(list[index], {
            isStartStation: index === 0,
            isEndStation: index === list.length - 1
          });
        }

        setScheduleList(list);
      });
  }, []);

  return (
    <div className="qn_dialog">
      <div className="schedule mask" onClick={toggleIsScheduleVisible}>
        <div className="dialog" onClick={(e) => e.stopPropagation()}>
          <h1>列车时刻表</h1>
          <div className="head">
            <span className="station">车站</span>
            <span className="deptime">到达</span>
            <span className="arrtime">发车</span>
            <span className="stoptime">停留时间</span>
          </div>
          <ul>
            {scheduleList.map((schedule, index) => {
              return (
                <ScheduleRow
                  key={schedule.station}
                  index={index + 1}
                  {...schedule}
                ></ScheduleRow>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

Schedule.propTypes = {
  date: PropTypes.number.isRequired,
  trainNumber: PropTypes.string.isRequired,
  departStation: PropTypes.string.isRequired,
  arriveStation: PropTypes.string.isRequired,
  toggleIsScheduleVisible: PropTypes.func.isRequired
};

export default memo(Schedule);
