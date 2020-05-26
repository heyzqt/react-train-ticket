import React, { useState, useRef } from "react";
import "./slider.scss";
import PropTypes from "prop-types";
import classnames from "classnames";
import leftpad from "left-pad";
import { useEffect } from "react";

//slider时间滑块的实现
//1.时间滑动条是有一个定长
//2.滑动条高亮的长度由(endPercent-startPercent)*100%来决定
//3.左侧滑块的位置由startPercent决定
//4.右侧滑块的位置由endPercent决定
//5.默认缓存了start、end时间，由这2个的时间可以得出startPercent或者endPercent
//6.具体的时间点00:00可以由startPercent计算出来

function Slider(props) {
  const { title, currentStartHours, currentEndHours } = props;
  const startHandleRef = useRef();
  const endHandleRef = useRef();

  //   const [start, setStart] = useState(() => currentStartHours); //todo为什么使用箭头函数，而不是直接返回数据
  //   const [end, setEnd] = useState(() => currentEndHours);

  const [start, setStart] = useState(() => 0); //todo为什么使用箭头函数，而不是直接返回数据
  const [end, setEnd] = useState(() => 20);

  const startPercent = (start / 24) * 100;
  const endPercent = (end / 24) * 100;

  const startText = leftpad(start, 2, "0") + ":00";
  const endText = end + ":00";

  const range = useRef();

  const lastStartX = useRef();
  console.log('lastStartX = ', lastStartX);

  let startHandleX = 0;

  const onStartTouchBegin = (e) => {
    // console.log(e);
    // console.log(e.targetTouches[0].clientX)
    startHandleX = e.targetTouches[0].clientX;
  };

  const onStartTouchMove = (e) => {
    // console.log(e);
    console.log(range.current);
    // console.log(range.current.width);
    let startHandleEnd = e.targetTouches[0].clientX;
    let allWidth = parseInt(window.getComputedStyle(range.current).width.replace("px", ""));
    let position = (startHandleEnd - startHandleX) / allWidth ;
    console.log(distance)

    if (position < 0) {
      setStart(0);
    }
    
    // setStart();
  };

  useEffect(() => {
    startHandleRef.current.addEventListener(
      "touchstart",
      onStartTouchBegin,
      false
    );
    startHandleRef.current.addEventListener(
      "touchmove",
      onStartTouchMove,
      false
    );
  }, []);

  return (
    <div className="option">
      <h3>出发时间</h3>
      <div className="slider-wrapper">
        <div className="slider" ref={range}>
          <div
            className={classnames("slider-range")}
            style={{
              left: startPercent + "%",
              width: endPercent - startPercent + "%"
            }}
          ></div>
          <div
            ref={startHandleRef}
            className="slider-handle"
            style={{ left: startPercent + "%" }}
          >
            <span>{startText}</span>
          </div>
          <div className="slider-handle" style={{ left: endPercent + "%" }}>
            <span>{endText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
