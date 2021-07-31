import React from "react";
import { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { connect } from "react-redux";

class Editprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirm_password: "",
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/users/" + this.props.match.params.id)
      .then((result) => this.setState({ username: result.data.username }));
  }

  onChangeUserName = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  onChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  onChangeConfirmPassword = (event) => {
    this.setState({
      confirm_password: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (
      this.state.password.length >= 8 &&
      this.state.password === this.state.confirm_password
    ) {
      const user = {
        username: this.state.username,
        password: this.state.password,
      };

      axios
        .patch(
          "http://localhost:5000/users/" + this.props.match.params.id,
          user
        )
        .then((result) => console.log(result.data))
        .catch((err) => console.log(err));
      this.props.history.push("/");
    } else if (this.state.password.length < 8) {
      console.log("Minimum password length is 8");
    } else if (this.state.password !== this.state.confirm_password) {
      console.log("Passwords did not match");
    }
    this.setState({
      username: "",
      password: "",
      confirm_password: "",
    });
  };

  render() {
    return (
      <div>
        <h3>Edit Profile</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>User name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUserName}
            />
          </div>

          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password: </label>
            <input
              type="password"
              required
              className="form-control"
              value={this.state.confirm_password}
              onChange={this.onChangeConfirmPassword}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Save Profile"
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

const mapStateToDispatch = (dispatch) => {
  return {
    setAuthentication: () => dispatch({ type: "USER_LOGGEDIN" }),
    setRole: () => dispatch({ type: "ADMIN_ROLE" }),
    setUser: (user) => dispatch({ type: "SET_USER", user }),
  };
};

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(withRouter(Editprofile));
