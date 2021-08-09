import React from "react";
import classes from "./Comment.module.css";

function Comments({ username, comment }) {
  return (
    <React.Fragment>
      <div className={classes.comments}>
        <div className={classes.username}>{username}</div>
        <div className={classes.comment}>{comment}</div>
      </div>
    </React.Fragment>
  );
}

export default Comments;
