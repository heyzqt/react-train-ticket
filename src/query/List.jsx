import React, { memo, useMemo } from "react";
import "./List.scss";
import PropTypes from "prop-types";
import URI from "urijs";

//车次列表实现思路
//UI: List列表显示整个车次列表，ListItem显示每条列表数据，ListItem包含出发到达时间、
//首发站终点站、车次行程时间、票价和剩余票数
//数据：
//1.出发时间
//2.到达时间
//3.出发地点
//4.到达地点
//5.出发车次
//6.行程时间
//7.车票价格
//8.剩余票数
//9.行程时间是否超过1天标志
//逻辑：点击ListItem跳转到下一个行程详情页界面

const ListItem = memo(function ListItem(props) {
  const {
    dTime,
    aTime,
    dStation,
    aStation,
    trainNumber,
    date,
    time,
    priceMsg,
    dayAfter,
  } = props;

  const url = useMemo(() => {
    return new URI("ticket.html")
      .setSearch("aStation", aStation)
      .setSearch("dStation", dStation)
      .setSearch("date", date)
      .setSearch("trainNumber", trainNumber)
      .toString();
  }, [aStation, dStation, date, trainNumber]);

  return (
    <li className="list-item">
      <a href={url}>
        <span className="item-time">
          <em>{dTime}</em>
          <br />
          <em className="em-light">
            {aTime} <i className="time-after">{dayAfter}</i>
          </em>
        </span>
        <span className="item-stations">
          <em>
            <i className="train-station train-start">始</i>
            {dStation}
          </em>
          <br />
          <em className="em-light">
            <i className="train-station train-end">终</i>
            {aStation}
          </em>
        </span>
        <span className="item-train">
          <em>{trainNumber}</em>
          <br />
          <em className="em-light">{time}</em>
        </span>
        <span className="item-ticket">
          <em>{priceMsg}</em>
          <br />
          <em className="em-light-orange">可抢票</em>
        </span>
      </a>
    </li>
  );
});

ListItem.propTypes = {
  dTime: PropTypes.string.isRequired,
  aTime: PropTypes.string.isRequired,
  dStation: PropTypes.string.isRequired,
  aStation: PropTypes.string.isRequired,
  trainNumber: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  priceMsg: PropTypes.string.isRequired,
  dayAfter: PropTypes.string.isRequired,
};

function List(props) {
  const { list } = props;
  return (
    <ul className="list">
      {list.map((item) => {
        return <ListItem {...item} key={item.trainNumber} />;
      })}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.array.isRequired,
};

export default memo(List);
