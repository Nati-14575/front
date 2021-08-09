import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import classes from "./event.module.css";
import Pagination from "../../../component/Pagination";

class editEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      posts: [],
      currentPage: 1,
      postsPerPage: 10,
    };
  }

  componentDidMount() {
    axios
      .get("https://churchevent14575.herokuapp.com/events/")
      .then((result) => {
        this.setState({
          events: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate() {
    axios
      .get("https://churchevent14575.herokuapp.com/events/")
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
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.events.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    const paginate = (pageNumber) => {
      this.setState({
        currentPage: pageNumber,
      });
    };

    return (
      <React.Fragment>
        <div className={classes.bodyContainer}>
          <h3 className={classes.h3}>Events</h3>
          <div className={classes.container}>
            {currentPosts.map((event) => {
              return (
                <>
                  <table className={classes.content_table} key={event._id}>
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
                      </tr>
                      <Link
                        to={"/event/" + event._id}
                        className={classes.view_details}
                      >
                        View details
                      </Link>
                    </tbody>
                  </table>
                </>
              );
            })}
          </div>
        </div>

        {this.state.events.length > 0 && (
          <div>
            <Pagination
              postsPerPage={this.state.postsPerPage}
              totalPosts={this.state.events.length}
              paginate={paginate}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default editEvent;
