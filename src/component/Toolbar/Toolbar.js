import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import classes from "./Toolbar.module.css";
import Drawertoggle from "./Sidedrawer/Drawertoggle";
import logo from "../../assets/Toolbar/logo.png";
import eventIcon from "../../assets/Toolbar/event.png";
import loginIcon from "../../assets/Toolbar/login.png";
import signupIcon from "../../assets/Toolbar/signup.png";
import editIcon from "../../assets/Toolbar/edit.png";
import exitIcon from "../../assets/Toolbar/exit.png";
import { userLogout } from "../../store/redux/actions/userActions";

class toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginPage: true,
    };
  }

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
    const { reducer } = this.props;
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
                <Link to="/events" className={classes.toolbar_navigation_link}>
                  <div className={classes.iconContainer}>
                    <img src={eventIcon} />
                  </div>
                </Link>
              </li>
              {reducer.isAuthenticated ? (
                <>
                  {reducer.adminrole && (
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
                    {reducer.isAuthenticated && (
                      <Link
                        to={"/user/editprofile/" + reducer.currentUser._id}
                        className={classes.toolbar_navigation_link}
                      >
                        <div className={classes.iconContainer}>
                          <img src={editIcon} />
                        </div>
                      </Link>
                    )}
                  </li>
                  <li>
                    <a
                      onClick={this.props.userLogout}
                      className={classes.toolbar_navigation_link}
                    >
                      <div className={classes.iconContainer}>
                        <img src={exitIcon} />
                      </div>
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
                      <div className={classes.iconContainer}>
                        <img src={loginIcon} />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user/signup"
                      className={classes.toolbar_navigation_link}
                    >
                      <div className={classes.iconContainer}>
                        <img src={signupIcon} />
                      </div>
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
const mapStateToDispatch = {
  userLogout,
};
export default connect(
  mapStateToProps,
  mapStateToDispatch
)(withRouter(toolbar));
