import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import classes from "./oneEvent.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Pagination from "../../../component/Pagination";
import Comments from "../../Comments";

class event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      comments: [],
      comment: "",
      username: "",
      loginCorrect: true,
      commentPosted: false,
      currentPage: 1,
      postsPerPage: 5,
    };
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  componentDidMount() {
    this.setState({
      username: this.props.reducer.currentUser.username,
    });

    axios
      .get(
        "https://churchevent14575.herokuapp.com/events/" +
          this.props.match.params.id
      )
      .then((result) => {
        this.setState({
          event: result.data,
        });
      });

    axios
      .get("https://churchevent14575.herokuapp.com/comments/")
      .then((result) => {
        this.setState({
          comments: result.data,
        });
      });
  }

  componentDidUpdate() {
    axios
      .get("https://churchevent14575.herokuapp.com/comments/")
      .then((result) => {
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
      .delete("https://churchevent14575.herokuapp.com/events/" + id)
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
        .post("https://churchevent14575.herokuapp.com/comments/add", newComment)
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
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.comments.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    const paginate = (pageNumber) => {
      this.setState({
        currentPage: pageNumber,
      });
    };
    return (
      <>
        <div className={classes.container}>
          <h3 className={classes.h3}>Event</h3>
          {this.state.event && (
            <>
              <div className={classes.eventContainer}>
                <div className={classes.row}>
                  <div className={classes.headings}>Poster Name</div>
                  <div className={classes.body}>
                    {this.state.event.username}
                  </div>
                </div>
                <div className={classes.row}>
                  <div className={classes.headings}>Event Name</div>
                  <div className={classes.body}>
                    {this.state.event.eventname}
                  </div>
                </div>
                <div className={classes.row}>
                  <div className={classes.headings}>Description</div>
                  <div className={classes.body}>
                    {this.state.event.description}
                  </div>
                </div>
                <div className={classes.row}>
                  <div className={classes.headings}>Duration</div>
                  <div className={classes.body}>
                    {this.state.event.duration}
                  </div>
                </div>
                <div className={classes.row}>
                  <div className={classes.headings}>Date</div>
                  <div className={classes.body}>
                    {new Date(this.state.event.date).toLocaleDateString(
                      "en-us"
                    )}
                  </div>
                </div>
                <div className={classes.row}>
                  <div className={classes.headings}>Location</div>
                  <div className={classes.body}>
                    {this.state.event.username}
                  </div>
                </div>

                {this.state.event.username ===
                  this.props.reducer.currentUser.username && (
                  <div className={classes.editDelete}>
                    <div className={classes.each1}>
                      <Link to={"/edit/" + this.state.event._id}>Edit</Link>
                    </div>
                    <div className={classes.each}>
                      <a
                        href="/"
                        onClick={() => {
                          this.deleteEvent(this.state.event._id);
                        }}
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                )}
              </div>
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
                  rows={4}
                  className={classes.text_field}
                />
                <span></span>
                <center>
                  <Button
                    onClick={this.onSubmit}
                    variant="contained"
                    color="primary"
                    className={classes.postButton}
                  >
                    Comment
                  </Button>
                </center>
              </div>
              <div className={classes.commentShower}>
                <h3>Comments</h3>
                {this.state.comments.length > 0 ? (
                  currentPosts.map((comment) => {
                    return (
                      <Comments
                        username={comment.username}
                        comment={comment.comment}
                      />
                    );
                  })
                ) : (
                  <div className={classes.noComment}>
                    <label>No Comment</label>
                  </div>
                )}
                {this.state.comments.length > 0 && (
                  <div>
                    <Pagination
                      postsPerPage={this.state.postsPerPage}
                      totalPosts={this.state.comments.length}
                      paginate={paginate}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reducer: state.AR,
  };
};

export default connect(mapStateToProps)(event);
