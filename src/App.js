import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

// Component Import
import Navbar from "./component/navbarComponent";
import eventList from "./component/eventList";
import editEvent from "./component/editEvent";
import createEvent from "./component/createEvent";
import signUp from "./component/signUp";
import homePage from "./component/homePage";
import login from "./component/login";
import editProfile from "./component/editProfile";
import anevent from "./component/event";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />
          <Route path="/" exact component={homePage} />
          <Route path="/events" exact component={eventList} />
          <Route path="/event/:id" exact component={anevent} />
          <Route path="/edit/:id" exact component={editEvent} />
          <Route path="/create" exact component={createEvent} />
          <Route path="/user/signUp" exact component={signUp} />
          <Route path="/user/login" exact component={login} />
          <Route path="/user/editprofile/:id" exact component={editProfile} />
        </div>
      </Router>
    );
  }
}

export default App;
