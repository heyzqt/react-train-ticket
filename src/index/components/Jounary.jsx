import React from "react";
import "./Jounary.scss";
import switchImg from "../imgs/switch.svg";

function Jounary(props) {
  const { from, to, showCitySelector, exchangeFromTo } = props;

  return (
    <div className="jounary">
      <div className="jounary-station" onClick={() => showCitySelector(true)}>
        <input
          type="text"
          readOnly
          name="from"
          value={from}
          className="jounary-input jounary-from"
        ></input>
      </div>
      <div className="jounary-switch" onClick={exchangeFromTo}>
        <img src={switchImg} width="70" height="40" alt="switch" />
      </div>
      <div className="jounary-station" onClick={() => showCitySelector(false)}>
        <input
          type="text"
          readOnly
          name="to"
          value={to}
          className="jounary-input jounary-to"
        ></input>
      </div>
    </div>
  );
}

export default Jounary;
