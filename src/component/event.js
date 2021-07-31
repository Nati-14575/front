import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

class event extends Component {
  constructor(props) {
    super(props);
    this.state = { event: [] };
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/events/" + this.props.match.params.id)
      .then((result) => {
        this.setState({
          event: result.data,
        });
      });
  }

  deleteEvent = (id) => {
    axios
      .delete("http://localhost:5000/events/" + id)
      .then((result) => console.log(result.data));
    this.props.history.push("/events");
  };

  render() {
    return (
      <div>
        <h3>Event</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Poster Name</th>
              <th>Event Name</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr key={this.state.event._id}>
              <td>{this.state.event.username}</td>
              <td>{this.state.event.eventname}</td>
              <td>{this.state.event.description}</td>
              <td>{this.state.event.duration}</td>
              <td>{this.state.event.date}</td>
              <td>{this.state.event.location}</td>
              {this.state.event.username ===
                this.props.reducer.currentUser.username && (
                <td>
                  <Link to={"/edit/" + this.state.event._id}>Edit</Link> |
                  <a
                    href="#"
                    onClick={() => {
                      this.deleteEvent(this.state.event._id);
                    }}
                  >
                    Delete
                  </a>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reducer: state,
  };
};

export default connect(mapStateToProps)(event);
