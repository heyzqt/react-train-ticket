import React, { memo, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import "./Detail.scss";
import { connect } from "react-redux";
import dayjs from "dayjs";
import "dayjs/locale/zh";

//车票详情Detail组件实现思路
//UI: 左侧出发站台、时刻、日期，中部车次列表、时刻表、耗时，右侧到达站台、时刻、日期

//数据：
//出发站台、出发时刻、出发日期
//列车编号、行程耗时
//到达站台、到达时刻、到达日期

//业务逻辑&UI逻辑：
//UI逻辑：时刻和日期的格式化
//业务逻辑：点击中部时刻表弹出时刻表

function Detail(props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    departStation,
    arriveStation,
    trainNumber,
    durationStr,
    toggleIsScheduleVisible
  } = props;

  const departDateStr = useMemo(() => {
    return dayjs(departDate).locale("zh").format("MM-DD dddd");
  }, [departDate]);

  const arriveDateStr = useMemo(() => {
    return dayjs(arriveDate).locale("zh").format("MM-DD dddd");
  }, [arriveDate]);

  return (
    <div className="detail">
      <div className="content">
        <div className="left">
          <p className="city">{departStation}</p>
          <p className="time">{departTimeStr}</p>
          <p className="date">{departDateStr}</p>
        </div>
        <div className="middle" onClick={() => toggleIsScheduleVisible()}>
          <p className="train-name">{trainNumber}</p>
          <p className="train-mid">时刻表</p>
          <p className="train-time">耗时{durationStr}</p>
        </div>
        <div className="right">
          <p className="city">{arriveStation}</p>
          <p className="time">{arriveTimeStr}</p>
          <p className="date">{arriveDateStr}</p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

Detail.propTypes = {
  departDate: PropTypes.number.isRequired,
  arriveDate: PropTypes.number.isRequired,
  departTimeStr: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  arriveTimeStr: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  departStation: PropTypes.string.isRequired,
  arriveStation: PropTypes.string.isRequired,
  trainNumber: PropTypes.string.isRequired,
  durationStr: PropTypes.string.isRequired,
  toggleIsScheduleVisible: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
