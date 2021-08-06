import React from "react";
import { connect } from "react-redux";
import { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./form.module.css";
import logo from "../../../assets/Toolbar/logo.png";
import { userLogin } from "../../../store/redux/actions/userActions";

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

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.userLogin({ username, password }, this.props.history);
  };

  render() {
    const { UI } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.imgContainer}>
          <img src={logo} />
        </div>
        <div className={classes.center}>
          <h1>Login</h1>
          {UI.error !== null && <div className={classes.error}>{UI.error}</div>}
          <form onSubmit={this.handleSubmit}>
            <div className={classes.txt_field}>
              <input
                type="text"
                required
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
              <span></span>
              <label>Username: </label>
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
            <div className={classes.pass}>
              <Link to="/users/forgotpassword">forgot password?</Link>
            </div>
            <div className={classes.signup_link}>
              <input type="submit" value="Log in" className={classes.submit} />
              <label>Don't have an account?</label>
              <Link to="../user/signup">Sign Up</Link>
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
  userLogin,
};

export default connect(mapStateToProps, mapStateToDispatch)(login);
