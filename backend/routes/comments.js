const express = require("express");
const router = express.Router();
let Comment = require("../models/commentModel");

// Get all comments
router.route("/").get(async (req, res) => {
  await Comment.find()
    .then((Comments) => res.json(Comments))
    .catch((err) => {
      res.status(400).json("Error" + err);
    });
});

// Post a comment
router.route("/add").post(async (req, res) => {
  const comment = req.body.comment;
  const username = req.body.username;
  const newComment = new Comment({ comment, username });

  await newComment
    .save()
    .then(() => res.json("Comment added"))
    .catch((err) => {
      res.status(400).json("Error" + err);
    });
});

// Get a comment
router.route("/:id").get(async (req, res) => {
  await Comment.findById(req.params.id)
    .then((event) => res.json(event))
    .catch((err) => {
      res.status(400).json("Error" + err);
    });
});

// Edit comment
router.route("/add/:id").patch(async (req, res) => {
  await Comment.findByIdAndUpdate(req.params.id).then((comment) => {
    comment.username = req.body.username;
    comment.comment = req.body.comment;
    comment.save().then(() => res.json("Comment Updated"));
  });
});

module.exports = router;
