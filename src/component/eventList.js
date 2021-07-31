import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class editEvent extends Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };
    this.deleteEvent = this.deleteEvent.bind(this);
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

  deleteEvent = (id) => {
    axios
      .delete("http://localhost:5000/events/" + id)
      .then((result) => console.log(result.data));

    this.setState({
      events: this.state.events.filter((el) => el.id !== id),
    });
  };

  render() {
    return (
      <div>
        <h3>Events</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Event Name</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {this.state.events.map((event) => {
              return (
                <tr key={event._id}>
                  <td>{event.eventname}</td>
                  <td>{event.location}</td>
                  <td>
                    <Link
                      to={"/event/" + event._id}
                    >
                      View details
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default editEvent;
