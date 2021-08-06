const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const EventsRoute = require("./routes/events");
const UserRoute = require("./routes/users");
const CommentRoute = require("./routes/comments");
const DATABASE =
  "mongodb+srv://Nati:A5IiX9V4hrH1kR15@church.4wt2j.mongodb.net/church";

const DATABASE_LOCAL = "mongodb://localhost:27017/mern";

mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => {});

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
//
app.use("/events", EventsRoute);
app.use("/users", UserRoute);
app.use("/comments", CommentRoute);

//
app.listen(PORT, () => {
  res.json({
    status: "success",
    message: "Connected succesfull",
  });
});
