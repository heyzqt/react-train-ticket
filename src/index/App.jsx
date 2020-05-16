import React, { useCallback, useMemo } from "react";
import { connect } from "react-redux";
import "./App.scss";
import * as actions from "./store/actions";
import { bindActionCreators } from "redux";

import Header from "../common/Header";
import Jounary from "./components/Jounary";
import CitySelector from "./components/CitySelector";

function App(props) {
  const {
    from,
    to,
    isCitySelectorVisible,
    cityData,
    isLoadingCityData,
    showCitySelector,
    hideCitySelector,
    setSelectedCity,
    dispatch
  } = props;

  const onBack = useCallback(() => {
    window.history.back();
  });

  const cbs = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo: actions.exchangeFromTo,
        showCitySelector: actions.showCitySelector
      },
      dispatch
    );
  }, []);

  const cityCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: actions.hideCitySelector,
        fetchCityData: actions.fetchCityData,
        onSelect: actions.setSelectedCity
      },
      dispatch
    );
  }, []);

  return (
    <div>
      <Header title="火车票" onBack={onBack}></Header>
      <form className="form">
        <Jounary from={from} to={to} {...cbs}></Jounary>
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...cityCbs}
      ></CitySelector>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
