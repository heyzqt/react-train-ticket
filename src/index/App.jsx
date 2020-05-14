import React, { useCallback, useMemo } from "react";
import { connect } from "react-redux";
import "./App.css";
import * as actions from "./store/actions";
import { bindActionCreators } from "redux";

import Header from "../common/Header";
import Jounary from "./components/Jounary";

function App(props) {
  const { from, to, dispatch } = props;

  const onBack = useCallback(() => {
    window.history.back();
  });

  const cbs = useMemo(() => {
    return bindActionCreators({
      exchangeFromTo: actions.exchangeFromTo,
      showCitySelector: actions.showCitySelector
    }, dispatch);
  }, []);

  return (
    <div>
      <Header title="火车票" onBack={onBack}></Header>
      <Jounary
        from={from}
        to={to}
        {...cbs}
      ></Jounary>
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
