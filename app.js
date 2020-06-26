// Dependencies
var express = require("express");

// app initialization
var app = express();

// set our view engine
app.set("view engine", "ejs");

var PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.send("home Route");
});

app.listen(PORT, function () {
  console.log("Server is lit on PORT: " + PORT);
});
