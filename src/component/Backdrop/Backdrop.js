import React, { Component } from "react";
import classes from "./Backdrop.module.css";

class backdrop extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={classes.backdrop}
        onClick={this.props.backDropClickHandler}
      ></div>
    );
  }
}

export default backdrop;
