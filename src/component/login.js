import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Component } from "react";
import { Link } from "react-router-dom";

class login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      users: [],
      currentuser: [],
    };
  }

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/users")
      .then((result) => this.setState({ users: result.data }));
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.state.users.map((user) => {
      if (
        this.state.username === user.username &&
        this.state.password === user.password
      ) {
        this.props.setAuthentication();
        if (user.role === "admin") {
          this.props.setRole();
        }
        this.props.setUser(user);
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <div>
        <h3>Login</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
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
            <input type="submit" value="Log in" className="btn btn-primary" />
          </div>
          <div>
            <label>You don't have an account?</label>
            <Link to="../user/signup">Sign Up</Link>
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

export default connect(mapStateToProps, mapStateToDispatch)(login);
