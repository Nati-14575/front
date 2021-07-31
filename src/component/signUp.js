import React from "react";
import { Component } from "react";
import axios from "axios";
class createUserComponent extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      password: "",
      confirm_password: "",
    };
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

    if (this.state.password === this.state.confirm_password) {
      const user = {
        username: this.state.username,
        password: this.state.password,
      };
      console.log(user);

      axios
        .post("http://localhost:5000/users/add", user)
        .then((result) => console.log(result.data));

      this.setState({
        username: "",
        password: "",
        confirm_password: "",
      });
    } else {
      console.log("Password did not match");
    }
  };

  render() {
    return (
      <div>
        <h3>Sign Up</h3>

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className={this.state.username}
              onChange={this.onChangeUserName}
            />
          </div>

          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              required
              className={this.state.username}
              onChange={this.onChangePassword}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password: </label>
            <input
              type="password"
              require
              className="form-control"
              value={this.state.confirm_password}
              onChange={this.onChangeConfirmPassword}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default createUserComponent;
