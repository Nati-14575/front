import React from "react";
import { connect } from "react-redux";
import { Component } from "react";

class login extends Component {
  constructor(props) {
    super(props);
    this.check = this.check.bind(this);
  }

 
  render() {
    return <div>{this.check()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    reducer: state,
  };
};

const mapStateToDispatch = (dispatch) => {
  return {
    setAuthentication: () => dispatch({ type: "USER_LOGGEDOUT" }),
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(login);
