import React from "react";
import { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { connect } from "react-redux";

class createEvent extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeEventName = this.onChangeEventName.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
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
    };
  }

  componentDidMount() {
    this.setState({
      username: this.props.reducer.currentUser.username,
    });
  }

  onChangeUserName = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  onChangeEventName = (event) => {
    this.setState({
      eventname: event.target.value,
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

  onChangeLocation = (event) => {
    this.setState({
      location: event.target.value,
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
      .post("http://localhost:5000/events/add", event)
      .then((result) => console.log(result.data));
    this.props.history.push("/events");
  };

  render() {
    return (
      <div>
        <h3>Create Events</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Poster name: </label>
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
            <textarea
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
              value="Create Event"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reducer: state,
  };
};

export default connect(mapStateToProps)(createEvent);
