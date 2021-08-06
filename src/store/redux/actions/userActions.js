import axios from "axios";

import {
  USER_LOGGEDIN,
  USER_LOGGEDOUT,
  SET_USER,
  REMOVE_USER,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING,
  UPLOAD_PHOTO,
  SET_NOTIFICATIONS,
  MARK_NOTIFICATIONS_READ,
} from "../types";

export const userLogin = (userData, history) => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
  dispatch({
    type: LOADING_UI,
  });
  axios
    .post("https://churchevent14575.herokuapp.com/users/login", {
      username: userData.username,
      password: userData.password,
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: USER_LOGGEDIN,
      });
      dispatch({
        type: LOADING_UI,
      });
      dispatch({
        type: "SET_USER",
        user: res.data.data,
      });
      if (res.data.data.role === "admin") {
        dispatch({
          type: "ADMIN_ROLE",
        });
      }
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: LOADING_UI,
      });
      dispatch({
        type: SET_ERRORS,
        error: err,
      });
      setTimeout(() => {
        dispatch({
          type: CLEAR_ERRORS,
        });
      }, 2500);
    });
};

export const verifyAccount = (token, history) => (dispatch) => {
  axios
    .post(`https://churchevent14575.herokuapp.com/users/verify/${token}`)
    .then((res) => {
      dispatch({
        type: USER_LOGGEDIN,
      });
      dispatch({
        type: SET_USER,
        user: res.data.data,
      });
      history.push("/");
    })
    .catch((err) => {
      console.log(err.response.data);
      history.push("/signup");
    });
};

export const userSignup = (userData, history) => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
  dispatch({
    type: LOADING_UI,
  });

  axios
    .post("https://churchevent14575.herokuapp.com/users/add", {
      email: userData.email,
      username: userData.username,
      password: userData.password,
      confirmPassword: userData.confirm_password,
    })
    .then((res) => {
      dispatch({
        type: LOADING_UI,
      });
      history.push("/users/verify");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        error: err.response.data.message,
      });
      setTimeout(() => {
        dispatch({
          type: CLEAR_ERRORS,
        });
      }, 2500);
    });
};

export const userLogout = (history) => (dispatch) => {
  axios
    .post("https://churchevent14575.herokuapp.com/users/logout")
    .then(() => {
      dispatch({ type: USER_LOGGEDOUT });
      dispatch({ type: REMOVE_USER });
    })
    .catch((err) => console.error(err));
};

export const uploadImage = (formData) => (dispatch) => {
  axios
    .patch("/users/", formData)
    .then((res) => {
      dispatch({
        type: UPLOAD_PHOTO,
        user: res.data.result._id,
        photo: res.data.result.photo,
      });
      dispatch({
        type: SET_USER,
        user: res.data.result,
      });
    })
    .catch((err) => console.error(err));
};

export const editUser = (userDetails) => (dispatch) => {
  dispatch({
    type: LOADING,
  });

  axios
    .patch("https://churchevent14575.herokuapp.com/users/", userDetails)
    .then((res) => {
      dispatch({
        type: SET_USER,
        user: userDetails,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOADING,
      });
    });
};

export const forgetPass = (email, history) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });

  axios
    .post("https://churchevent14575.herokuapp.com/users/forgot-password", {
      email,
    })
    .then((res) => {
      dispatch({
        type: LOADING_UI,
      });
      history.push("/users/resetpassword");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: LOADING_UI,
      });
      dispatch({
        type: SET_ERRORS,
        error: err.response.data,
      });
      setTimeout(() => {
        dispatch({
          type: CLEAR_ERRORS,
        });
      }, 2500);
    });
};

export const resetPass = (token, newPass, history) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });
  axios
    .patch(
      `https://churchevent14575.herokuapp.com/users/reset-password/${token}`,
      newPass
    )
    .then((res) => {
      dispatch({
        type: USER_LOGGEDIN,
      });
      dispatch({
        type: LOADING_UI,
      });
      dispatch({
        type: SET_USER,
        user: res.data.data,
      });
      setTimeout(() => {
        history.push("/");
      }, 500);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: LOADING_UI,
      });
      dispatch({
        type: SET_ERRORS,
        error: err.response.data,
      });
      setTimeout(() => {
        dispatch({
          type: CLEAR_ERRORS,
        });
        history.push("/login");
      }, 5000);
    });
};

export const setNotifications = () => (dispatch) => {
  axios
    .get("/users/notifications")
    .then((res) =>
      dispatch({ type: SET_NOTIFICATIONS, payload: res.data.data })
    )
    .catch((err) => console.error(err));

  setInterval(() => {
    axios
      .get("/users/notifications")
      .then((res) =>
        dispatch({ type: SET_NOTIFICATIONS, payload: res.data.data })
      )
      .catch((err) => console.error(err));
  }, 10000);
};

export const markNotificationsRead = () => (dispatch) => {
  dispatch({
    type: MARK_NOTIFICATIONS_READ,
  });
  axios.post("/users/notifications").catch((err) => console.error(err));
};

export const authCheck = () => (dispatch) => {
  axios
    .get("/users/authcheck")
    .then((res) => {
      if (res.data.user) {
        dispatch({
          type: LOADING,
        });
        dispatch({
          type: USER_LOGGEDIN,
        });
        dispatch({
          type: SET_USER,
          user: res.data.user,
        });
      }
    })
    .catch((err) => console.error("error: ", err.response));
};
