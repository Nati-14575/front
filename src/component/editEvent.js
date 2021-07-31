import React from "react";
import { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

class editEventComponent extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      eventname: "",
      location: "",
      description: "",
      duration: "",
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/events/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          username: response.data.username,
          eventname: response.data.eventname,
          location: response.data.location,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  onChangeEventName = (event) => {
    this.setState({
      eventname: event.target.value,
    });
  };

  onChangeLocation = (event) => {
    this.setState({
      location: event.target.value,
    });
  };
  onChangeUserName = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  onChangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  onChangeDuration = (event) => {
    this.setState({
      duration: event.target.value,
    });
  };

  onChangeDate = (date) => {
    this.setState({
      date: date,
    });
  };

  onSubmit = (submit) => {
    submit.preventDefault();

    const event = {
      username: this.state.username,
      location: this.state.location,
      eventname: this.state.eventname,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    axios
      .patch(
        "http://localhost:5000/events/" + this.props.match.params.id,
        event
      )
      .then((result) => console.log(result.data));

    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <h3>Edit Event Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              require
              className="form-control"
              value={this.state.username}
            />
          </div>
          <div className="form-group">
            <label>Event name: </label>
            <input
              type="text"
              require
              className="form-control"
              value={this.state.eventname}
              onChange={this.onChangeEventName}
            />
          </div>
          <div className="form-group">
            <label>Location: </label>
            <input
              type="text"
              require
              className="form-control"
              value={this.state.location}
              onChange={this.onChangeLocation}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              require
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration: </label>
            <input
              type="text"
              require
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit Event Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default editEventComponent;
