import React from "react";
import { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { connect } from "react-redux";
import classes from "../Profile/form.module.css";
import logo from "../../../assets/Toolbar/logo.png";

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
      .post("https://churchevent14575.herokuapp.com/events/add", event)
      .then((result) => console.log(result.data));
    this.props.history.push("/events");
  };

  render() {
    return (
      <React.Fragment>
        <div className={classes.container}>
          <div className={classes.center}>
            <h1>Create Event</h1>
            <form onSubmit={this.onSubmit}>
              <div className={classes.txt_field}>
                <input type="text" required value={this.state.username} />
                <span></span>
                <label>Poster name: </label>
              </div>
              <div className={classes.txt_field}>
                <input
                  type="text"
                  required
                  value={this.state.eventname}
                  onChange={this.onChangeEventName}
                />
                <span></span>
                <label>Event name: </label>
              </div>
              <div className={classes.txt_field}>
                <input
                  type="text"
                  required
                  value={this.state.location}
                  onChange={this.onChangeLocation}
                />
                <span></span>
                <label>Location: </label>
              </div>
              <div className={classes.txt_field}>
                <textarea
                  type="text"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                />
                <span></span>
                <label>Description: </label>
              </div>
              <div className={classes.txt_field}>
                <input
                  type="text"
                  required
                  value={this.state.duration}
                  onChange={this.onChangeDuration}
                />
                <span></span>
                <label>Duration(in hours): </label>
              </div>
              <div className={classes.txt_field}>
                <div>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                  />
                  <span></span>
                </div>
              </div>
              <input
                type="submit"
                value="Create Event"
                className={classes.submit}
              />
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reducer: state.AR,
  };
};

export default connect(mapStateToProps)(createEvent);
