const router = require("express").Router();
let User = require("../models/userModel");

// Get and

router.route("/").get((req, res, next) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("error" + err));
});

// Add a user

router.route("/add").post((req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({ username, password });

  newUser
    .save()
    .then(() => res.json("User added"))
    .catch((err) => res.status(400).json("Error" + err));
});

// Find one user
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("error" + err));
});

// Update User
router.route("/:id").patch((req, res) => {
  User.findByIdAndUpdate(req.params.id).then((user) => {
    user.username = req.body.username;
    user.password = req.body.password;

    user
      .save()
      .then(() => res.json("user updated"))
      .catch((err) => res.status(400).json("error" + err));
  });
});

// Delete User

router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("user deleted"))
    .catch((err) => res.status(400).json("error" + err));
});

module.exports = router;
