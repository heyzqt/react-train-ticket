import React, { useCallback } from "react";
import { connect } from "react-redux";
import "./App.css";

import Header from "../common/Header";
import Jounary from "./components/Jounary";

function App(props) {
  const onBack = useCallback(() => {
    window.history.back();
  });

  return (
    <div>
      <Header title="火车票" onBack={onBack}></Header>
      <Jounary></Jounary>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
