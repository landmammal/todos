// Dependencies
var express = require("express");

// app initialization
var app = express();

// set our view engine
app.set("view engine", "ejs");

// MIDDLEWARE -------------------
app.use(express.static("public")); // adding static assets (css, img, js files)

var PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.render("list-of-todos.ejs");
});

app.listen(PORT, function () {
  console.log("Server is lit on PORT: " + PORT);
});
