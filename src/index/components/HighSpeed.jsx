import React from "react";
import "./HighSpeed.scss";
import classnames from "classnames";
import PropTypes from "prop-types";

//只看高铁动车-实现思路
//1.UI-只看高铁动车UI
//2.数据-当前开关打开状态，控制开关的点击方法

function HighSpeed(props) {
  const { highSpeed, toggle } = props;

  return (
    <div className="high-speed">
      <div className="high-speed-label">只看高铁/动车</div>
      <div className="high-speed-switch" onClick={toggle}>
        <input type="hidden" name="highSpeed" value={highSpeed} />
        <div className={classnames("high-speed-track", { checked: highSpeed })}>
          <span
            className={classnames("high-speed-handle", { checked: highSpeed })}
          ></span>
        </div>
      </div>
    </div>
  );
}

HighSpeed.propTypes = {
  highSpeed: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

export default HighSpeed;
