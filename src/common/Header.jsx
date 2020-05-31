import React from "react";
import "./Header.scss";
import PropTypes from "prop-types";

function Header(props) {
  const { title, onBack } = props;

  return (
      <div className="header top_header">
          <div className="header-back" onClick={onBack}>
              <svg width="40" height="40">
                  <polyline
            points="25, 13 16, 21 25, 29"
            stroke="#fff"
            strokeWidth="2"
            fill="none"
          />
              </svg>
          </div>
          <h1 className="header-title">{title}</h1>
      </div>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired
};
