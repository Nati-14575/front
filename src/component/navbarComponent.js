import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import SideDrawer from "./sideDrawer";
import "./navBar.css";

class navBar extends Component {
  setOff = () => {
    this.props.setAuthentication();
    this.props.setRole();
    this.props.setUser();
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="navbar-custom">
        {/* <SideDrawer /> */}
        <ul>
          <li>
            <Link to="/" className="navbar-links">
              Home
            </Link>
          </li>
          <li>
            <Link to="/events" className="navbar-links">
              Events
            </Link>
          </li>
          {this.props.reducer.isAuthenticated ? (
            <>
              {this.props.reducer.adminrole && (
                <li className="navbar-item">
                  <Link to="/create" className="navbar-links">
                    Create Event
                  </Link>
                </li>
              )}
              <li className="navbar-item">
                <Link
                  to={"user/editprofile/" + this.props.reducer.currentUser._id}
                  className="navbar-links"
                >
                  Edit Profile
                </Link>
              </li>
              <li className="navbar-item">
                <a onClick={this.setOff} className="navbar-links">
                  Log out
                </a>
              </li>
            </>
          ) : (
            <li className="navbar-item">
              <Link to="/user/login" className="navbar-links">
                Login/Signup
              </Link>
            </li>
          )}
        </ul>
      </div>
    );
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
    setRole: () => dispatch({ type: "USER_ROLE" }),
    setUser: () => dispatch({ type: "REMOVE_USER" }),
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(withRouter(navBar));
