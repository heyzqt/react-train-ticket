import React from "react";
import { connect } from "react-redux";
import "./App.css";

import Nav from "../common/Nav";
import List from "./List";
import Bottom from "./Bottom";

function App(props) {
  return (
    <div>
      hello Query
      <Nav></Nav>
      <List></List>
      <Bottom></Bottom>
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
