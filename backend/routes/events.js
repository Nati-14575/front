const router = require("express").Router();
let Event = require("../models/eventModel");

// Get events

router.route("/").get((req, res, next) => {
  Event.find()
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json("error" + err));
});

// Post an event

router.route("/add").post((req, res, next) => {
  const username = req.body.username;
  const eventname = req.body.eventname;
  const location = req.body.location;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const createdEvent = new Event({
    username,
    eventname,
    description,
    duration,
    date,
    location,
  });

  createdEvent
    .save()
    .then(() => res.json("Event added"))
    .catch((err) => res.status(400).json("Error" + err));
});

// Get and display one event by id

router.route("/:id").get((req, res) => {
  Event.findById(req.params.id)
    .then((event) => res.json(event))
    .catch((err) => res.status(400).json("error" + err));
});

// Find event and update it by using id

router.route("/:id").patch((req, res) => {
  Event.findByIdAndUpdate(req.params.id).then((event) => {
    event.username = req.body.username;
    event.description = req.body.description;
    event.duration = Number(req.body.duration);
    event.date = Date.parse(req.body.date);

    event
      .save()
      .then(() => res.json("event updated"))
      .catch((err) => res.status(400).json("error" + err));
  });
});

// Delete Event

router.route("/:id").delete((req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => res.json("event deleted"))
    .catch((err) => res.status(400).json("error" + err));
});

module.exports = router;
