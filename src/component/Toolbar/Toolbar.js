import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import classes from "./Toolbar.module.css";
import Drawertoggle from "./Sidedrawer/Drawertoggle";
import logo from "../../assets/Toolbar/logo.png";

class toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginPage: true,
    };
  }

  setOff = () => {
    this.props.setAuthentication();
    this.props.setRole();
    this.props.setUser();
    this.props.history.push("/");
  };

  loginLogoChecker = () => {
    if (window.location.pathname === "/user/login") {
      return false;
    } else if (window.location.pathname === "/user/signup") {
      return false;
    } else {
      return true;
    }
  };

  render() {
    let checker;
    return (
      <header className={classes.toolbar}>
        <nav className={classes.toolbar_navigation}>
          <div>
            <Drawertoggle
              onDrawerToggleCLicked={this.props.onDrawerToggleCLicked}
            />
          </div>
          {this.loginLogoChecker() && (
            <div className={classes.toolbar_logo}>
              <Link to="/">
                <div className={classes.imgContainer}>
                  <img src={logo} />
                </div>
              </Link>
            </div>
          )}
          <div className={classes.spacer}></div>
          <div className={classes.toolbar_navigation_items}>
            <ul>
              <li>
                <Link to="/" className={classes.toolbar_navigation_link}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className={classes.toolbar_navigation_link}>
                  Events
                </Link>
              </li>
              {this.props.reducer.isAuthenticated ? (
                <>
                  {this.props.reducer.adminrole && (
                    <li>
                      <Link
                        to="/create"
                        className={classes.toolbar_navigation_link}
                      >
                        Create Event
                      </Link>
                    </li>
                  )}
                  <li>
                    {this.props.reducer.isAuthenticated && (
                      <Link
                        to={
                          "/user/editprofile/" +
                          this.props.reducer.currentUser._id
                        }
                        className={classes.toolbar_navigation_link}
                      >
                        Edit Profile
                      </Link>
                    )}
                  </li>
                  <li>
                    <a
                      onClick={this.setOff}
                      className={classes.toolbar_navigation_link}
                    >
                      Log out
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/user/login"
                      className={classes.toolbar_navigation_link}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user/signup"
                      className={classes.toolbar_navigation_link}
                    >
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
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
)(withRouter(toolbar));
