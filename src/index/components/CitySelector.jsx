import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import "./CitySelector.scss";
import { connect } from "react-redux";
import classnames from "classnames";

function CitySelector(props) {
  const { show, cityData, isLoading, onBack } = props;
  const [searchKey, setSearchKey] = useState("");

  const key = useMemo(() => {
    return searchKey.trim();
  }, [searchKey]);

  return (
    <div className={classnames("city-selector", { hidden: !show })}>
      <div className="city-search">
        <div className="search-back" onClick={onBack}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            value={searchKey}
            placeholder="城市、车站的中文或拼音"
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <i
            className={classnames("search-clean", { hidden: key.length === 0 })}
            onClick={() => setSearchKey("")}
          >
            &#xf063;
          </i>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(CitySelector);

CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired
};
