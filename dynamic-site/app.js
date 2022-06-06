const path = require("path");

const express = require("express");

const db = require("./data/database");
const mainRoutes = require("./routes/main.routes");

let port = 3000; // default port we use

if (process.env.PORT) {
  // if the PORT variable exists (PORT being a built in heroku variable)
  port = process.env.PORT; //use that instead of 3000
}

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
// Could add more middleware - e.g. session, body parsers etc.

app.use(mainRoutes);

app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

db.initDatabase()
  .then(function () {
    app.listen(port); // by default is 3000 when hosted locally, replaced with PORT and whatever it represents when it is hosted online via heroku
  })
  .catch(function (error) {
    console.log("Connecting to the database failed!");
  });
