const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const EventsRoute = require("./routes/events");
const UserRoute = require("./routes/users");
const DATABASE_LOCAL = 
  "mongodb://localhost:27017/mern" || process.env.DATABASE_LOCAL;

mongoose
  .connect(DATABASE_LOCAL, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to database successfully");
  });

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
//
app.use("/events",  EventsRoute);
app.use("/users",  UserRoute);

//
app.listen(PORT, () => {
  console.log("Connected successful");
});
