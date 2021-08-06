import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import classes from "./Sidedrawer.module.css";

class sidedrawer extends Component {
  constructor(props) {
    super(props);
  }
  setOff = () => {
    this.props.setAuthentication();
    this.props.setRole();
    this.props.setUser();
    this.props.history.push("/");
  };

  render() {
    return (
      <nav className={classes.side_drawer}>
        <ul>
          <li>
            <Link to="/" className={classes.side_drawer_link}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/events" className={classes.side_drawer_link}>
              Events
            </Link>
          </li>
          {this.props.reducer.isAuthenticated ? (
            <>
              {this.props.reducer.adminrole && (
                <li>
                  <Link to="/create" className={classes.side_drawer_link}>
                    Create Event
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to={"user/editprofile/" + this.props.reducer.currentUser._id}
                  className={classes.side_drawer_link}
                >
                  Edit Profile
                </Link>
              </li>
              <li>
                <a onClick={this.setOff} className={classes.side_drawer_link}>
                  Log out
                </a>
              </li>
            </>
          ) : (
            <li>
              <Link to="/user/login" className={classes.side_drawer_link}>
                Login/Signup
              </Link>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reducer: state.AR,
  };
};

const mapStateToDispatch = (dispatch) => {
  return {
    setAuthentication: () => dispatch({ type: "USER_LOGGEDOUT" }),
    setRole: () => dispatch({ type: "USER_ROLE" }),
    setUser: () => dispatch({ type: "REMOVE_USER" }),
  };
};

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(withRouter(sidedrawer));
