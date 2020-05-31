import React, { useCallback, useMemo } from "react";
import { connect } from "react-redux";
import "./App.scss";
import * as actions from "./store/actions";
import { bindActionCreators } from "redux";
import { h0 } from "../common/fp";

import Header from "../common/Header";
import Jounary from "./components/Jounary";
import CitySelector from "./components/CitySelector";
import DepartDate from "./components/DepartDate";
import DateSelector from "../common/DateSelector";
import HighSpeed from "./components/HighSpeed";
import Submit from "./components/Submit";

function App(props) {
  const {
    from,
    to,
    isCitySelectorVisible,
    cityData,
    isLoadingCityData,
    departDate,
    isDateSelectorVisible,
    highSpeed,
    dispatch
  } = props;

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  const cbs = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo: actions.exchangeFromTo,
        showCitySelector: actions.showCitySelector
      },
      dispatch
    );
  }, [dispatch]);

  const cityCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: actions.hideCitySelector,
        fetchCityData: actions.fetchCityData,
        onSelect: actions.setSelectedCity
      },
      dispatch
    );
  }, [dispatch]);

  const dateCbs = useMemo(() => {
    return bindActionCreators(
      {
        onClick: actions.showDateSelector
      },
      dispatch
    );
  }, [dispatch]);

  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: actions.hideDateSelector
      },
      dispatch
    );
  }, [dispatch]);

  const onSelectDate = useCallback(
    (day) => {
      if (!day || day < h0()) {
        return;
      }
      dispatch(actions.setDepartDate(day));
      dispatch(actions.hideDateSelector());
    },
    [dispatch]
  );

  const highSpeedCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggle: actions.toggleHighSpeed
      },
      dispatch
    );
  }, [dispatch]);

  return (
      <div>
          <Header title="火车票" onBack={onBack}></Header>
          <form className="form" action="./query.html">
              <Jounary from={from} to={to} {...cbs}></Jounary>
              <DepartDate time={departDate} {...dateCbs}></DepartDate>
              <HighSpeed highSpeed={highSpeed} {...highSpeedCbs}></HighSpeed>
              <Submit />
          </form>
          {/* 优化性能，添加Boolean判断，避免每次App重新渲染时，CitySelector和DateSelector也重新渲染 */}
          {Boolean(isCitySelectorVisible) && (
          <CitySelector
          show={isCitySelectorVisible}
          cityData={cityData}
          isLoading={isLoadingCityData}
          {...cityCbs}
        ></CitySelector>
      )}
          {Boolean(isDateSelectorVisible) && (
          <DateSelector
          show={isDateSelectorVisible}
          onSelect={onSelectDate}
          {...dateSelectorCbs}
        ></DateSelector>
      )}
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
