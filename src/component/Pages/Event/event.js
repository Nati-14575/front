import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import classes from "./oneEvent.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      comments: [],
      comment: "",
      username: "",
      loginCorrect: true,
      commentPosted: false,
    };
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

    axios.get("http://localhost:5000/comments/").then((result) => {
      this.setState({
        comments: result.data,
      });
    });
  }

  onChangeComment = (event) => {
    this.setState({
      comment: event.target.value,
    });
  };

  deleteEvent = (id) => {
    axios
      .delete("http://localhost:5000/events/" + id)
      .then((result) => console.log(result.data));
    this.props.history.push("/events");
  };

  onSubmit = (event) => {
    event.preventDefault();

    if (this.props.reducer.isAuthenticated) {
      const newComment = {
        username: this.state.username,
        comment: this.state.comment,
      };

      axios
        .post("http://localhost:5000/comments/add", newComment)
        .then((result) => {
          this.setState({ commentPosted: true });
          setTimeout(() => this.setState({ commentPosted: false }), 2000);
        });
      this.setState({ comment: "" });
    } else {
      this.setState({ loginCorrect: false });
      setTimeout(() => this.setState({ loginCorrect: true }), 2000);
    }
  };

  render() {
    return (
      <div className={classes.container}>
        <h3 className={classes.h3}>Event</h3>
        <table className={classes.content_table}>
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
              <td>{Number(this.state.event.duration)}</td>
              <td>
                {new Date(this.state.event.date).toLocaleDateString("en-us")}
              </td>
              <td>{this.state.event.location}</td>
              {this.state.event.username ===
                this.props.reducer.currentUser.username && (
                <>
                  <Link to={"/edit/" + this.state.event._id}>Edit</Link> |
                  <a
                    href="#"
                    onClick={() => {
                      this.deleteEvent(this.state.event._id);
                    }}
                  >
                    Delete
                  </a>
                </>
              )}
            </tr>
          </tbody>
        </table>
        <div className={classes.commentSection}>
          {!this.state.loginCorrect && (
            <div className={classes.error}>
              <label>Please log in to your account</label>
            </div>
          )}
          {this.state.commentPosted && (
            <div className={classes.success}>
              <label>Comment posted</label>
            </div>
          )}
          <TextField
            required
            onChange={this.onChangeComment}
            label="comment"
            placeholder="write a comment"
            variant="outlined"
            multiline
            rows={3}
            className={classes.txt_field}
          />
          <span></span>
          <Button
            onClick={this.onSubmit}
            variant="contained"
            color="primary"
            // disabled={this.props.loading}
            className={classes.postButton}
          >
            comment
          </Button>
        </div>
        <div className={classes.commentShower}>
          <h3>Comments</h3>
          {this.state.comments.map((comment) => {
            return (
              <div className={classes.commentContainer}>
                <div className={classes.username}>{comment.username}</div>
                <div className={classes.comment}>{comment.comment}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reducer: state.AR,
  };
};

export default connect(mapStateToProps)(event);
