import React, { memo } from "react";
import "./Submit.scss";

function Submit(props) {
  return (
    <div className="submit">
      <button type="submit" className="submit-button">
        搜索
      </button>
    </div>
  );
}

export default memo(Submit);
