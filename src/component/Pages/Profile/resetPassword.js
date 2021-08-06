import React, { useState } from "react";
import { connect } from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { resetPass } from "../../../store/redux/actions/userActions";
import styler from "./form.module.css";

const styles = (theme) => ({
  ...theme.spreadIt,
  resetForm: {
    maxWidth: "300px",
  },
});

const textStyle = {
  display: "inline",
  color: "#800080",
  marginLeft: "10px",
  fontSize: 36,
  textAlign: "center",
};

function ResetPassword({ resetPass, classes, UI, history }) {
  const [inputFields, setInputFields] = useState({
    password: "",
    confirmPassword: "",
  });

  let token;
  const noToken =
    window.location.pathname.endsWith("resetpassword") ||
    window.location.pathname.endsWith("resetpassword/");

  if (!noToken) {
    const splittedPathname = window.location.pathname.split("/");
    token = splittedPathname[splittedPathname.length - 1];
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPass(token, inputFields, history);
  };

  const handleChange = (event) => {
    setInputFields({
      ...inputFields,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={styler.container}>
      <div className={styler.center}>
        {!noToken ? (
          <>
            {UI.error && <div className={styler.error}>{UI.error.message}</div>}
            <form onSubmit={handleSubmit}>
              <div className={styler.txt_field}>
                <input
                  id="password"
                  name="password"
                  type="password"
                  label="New password"
                  className={styler.textField}
                  value={inputFields.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styler.txt_field}>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  className={styler.textField}
                  value={inputFields.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input type="submit" value="Reset" className={classes.submit} />
              </div>
            </form>
          </>
        ) : (
          <h1 id="notFound" style={textStyle}>
            An email has been successfully sent to your account. Follow the
            instructions to reset your password
          </h1>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { UI: state.UI };
};

export default connect(mapStateToProps, { resetPass })(
  withStyles(styles)(ResetPassword)
);
