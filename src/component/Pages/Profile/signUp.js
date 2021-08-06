import React, { Component } from "react";
import classes from "./form.module.css";
import logo from "../../../assets/Toolbar/logo.png";
import { connect } from "react-redux";
import { userSignup } from "../../../store/redux/actions/userActions";

class signup extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
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

  onChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
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
    const userData = {
      ...this.state,
    };
    this.props.userSignup(userData, this.props.history);
  };

  render() {
    const { UI } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.imgContainer}>
          <img src={logo} />
        </div>
        <div className={classes.center}>
          <h1>Sign Up</h1>
          {UI.error !== null && <div className={classes.error}>{UI.error}</div>}
          <form onSubmit={this.onSubmit}>
            <div className={classes.txt_field}>
              <input
                type="text"
                required
                value={this.state.username}
                onChange={this.onChangeUserName}
              />
              <span></span>
              <label>Username: </label>
            </div>
            <div className={classes.txt_field}>
              <input
                type="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
              <span></span>
              <label>Email: </label>
            </div>
            <div className={classes.txt_field}>
              <input
                type="password"
                required
                value={this.state.password}
                onChange={this.onChangePassword}
              />
              <span></span>
              <label>Password: </label>
            </div>

            <div className={classes.txt_field}>
              <input
                type="password"
                required
                value={this.state.confirm_password}
                onChange={this.onChangeConfirmPassword}
              />
              <span></span>
              <label>Confirm Password: </label>
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Create User"
                className={classes.submit}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { UI: state.UI };
};

const mapStateToDispatch = {
  userSignup,
};

export default connect(mapStateToProps, mapStateToDispatch)(signup);
