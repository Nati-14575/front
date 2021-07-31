const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },

    eventname: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },

    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
