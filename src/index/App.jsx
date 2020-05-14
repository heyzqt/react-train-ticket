import React, { useCallback } from "react";
import { connect } from "react-redux";
import "./App.css";

import Header from "../common/Header";

function App(props) {
  const onBack = useCallback(() => {
    window.history.back();
  });

  return (
    <div>
      <Header title="火车票" onBack={onBack}></Header>
    </div>
  );
}

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
