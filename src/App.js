import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import classes from "./App.module.css";
import "./bootstrap/css/bootstrap.min.css";
// Component Import
import eventList from "./component/Pages/Event/eventList";
import editEvent from "./component/Pages/Event/editEvent";
import createEvent from "./component/Pages/Event/createEvent";
import signUp from "./component/Pages/Profile/signUp";
import login from "./component/Pages/Profile/login";
import editProfile from "./component/Pages/Profile/editProfile";
import anevent from "./component/Pages/Event/event";
import Sidedrawer from "./component/Toolbar/Sidedrawer/Sidedrawer";
import Toolbar from "./component/Toolbar/Toolbar";
import Backdrop from "./component/Backdrop/Backdrop";
import Footer from "./component/Footer/Footer";
import ResetPassword from "./component/Pages/Profile/resetPassword";
import forgotPassword from "./component/Pages/Profile/forgotPassword";
import verifyAccount from "./component/Pages/Profile/verifyAccount";

import { connect } from 'react-redux';
import { authCheck } from './store/redux/actions/userActions'

class App extends Component {
  state = {
    sideDrawerOpen: false,
  };

  componentDidMount() {
    this.props.authCheck();
  }

  drawerToggelClickHandler = () => {
    this.setState((prevState) => {
      return {
        sideDrawerOpen: !prevState.sideDrawerOpen,
      };
    });
  };

  backDropClickHandler = () => {
    this.setState({
      sideDrawerOpen: false,
    });
  };
  render() {
    let sideDrawer;
    let backDrop;
    if (this.state.sideDrawerOpen) {
      sideDrawer = <Sidedrawer />;
      backDrop = <Backdrop backDropClickHandler={this.backDropClickHandler} />;
    }
    return (
      <Router>
        <div className={classes.container}>
          <Toolbar onDrawerToggleCLicked={this.drawerToggelClickHandler} />
          {sideDrawer}
          {backDrop}

          <Route exact path="/" exact component={eventList} />
          <Route exact path="/event/:id" exact component={anevent} />
          <Route exact path="/edit/:id" exact component={editEvent} />
          <Route exact path="/events" exact component={eventList} />
          <Route exact path="/create" exact component={createEvent} />
          <Route exact path="/user/signUp" exact component={signUp} />
          <Route exact path="/user/login" exact component={login} />
          <Route
            exact
            path="/user/editprofile/:id"
            exact
            component={editProfile}
          />
          <Route path="/users/verify" component={verifyAccount} />
          <Route
            exact
            path="/users/forgotpassword"
            component={forgotPassword}
          />
          <Route path="/users/resetpassword" component={ResetPassword} />
        </div>
        <Footer />
      </Router>
    );
  }
}

export default connect(null, {authCheck})(App);
