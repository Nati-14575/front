import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import classes from "./event.module.css";

class editEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      posts: [],
      currentPage: 1,
      limit: 10,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/events/")
      .then((result) => {
        this.setState({
          events: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentWillUnmount() {
    axios
      .get("http://localhost:5000/events/")
      .then((result) => {
        this.setState({
          events: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className={classes.bodyContainer}>
        <h3 className={classes.h3}>Events</h3>
        <div className={classes.container}>
          {this.state.events.map((event) => {
            return (
              <table className={classes.content_table}>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <span></span>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={event._id}>
                    <td>{event.eventname}</td>
                    <td>{event.location}</td>
                    <Link
                      to={"/event/" + event._id}
                      className={classes.view_details}
                    >
                      View details
                    </Link>
                  </tr>
                </tbody>
              </table>
            );
          })}
        </div>
      </div>
    );
  }
}

export default editEvent;
