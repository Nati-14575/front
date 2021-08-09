import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import classes from "./Toolbar.module.css";
import Drawertoggle from "./Sidedrawer/Drawertoggle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import logo from "../../assets/Toolbar/logo.png";
import EditIcon from "@material-ui/icons/Edit";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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
    console.log(reducer.adminrole);
    return (
      <header className={classes.toolbar}>
        <nav className={classes.toolbar_navigation}>
          <div>
            <Drawertoggle
              onDrawerToggleCLicked={this.props.onDrawerToggleCLicked}
            />
          </div>
          <div className={classes.toolbar_logo}>
            <Link to="/">
              <label>Student Event</label>
            </Link>
          </div>
          <div className={classes.spacer}></div>
          <div className={classes.toolbar_navigation_items}>
            <ul>
              <li>
                <Link to="/events" className={classes.toolbar_navigation_link}>
                  <div className={classes.iconContainer}>
                    <DateRangeIcon fontSize="large" />
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
                        <div className={classes.iconContainer}>
                          <EditIcon fontSize="large" />
                        </div>
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
                          <AccountCircleIcon fontSize="large" />
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
                        <ExitToAppIcon fontSize="large" color="white" />
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
                        <VpnKeyIcon fontSize="large" />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user/signup"
                      className={classes.toolbar_navigation_link}
                    >
                      <div className={classes.iconContainer}>
                        <AddCircleIcon fontSize="large" />
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
