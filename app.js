// Dependencies
var express = require("express");

// app initialization
var app = express();

// set our view engine
app.set("view engine", "ejs");

// MIDDLEWARE -------------------
app.use(express.static("public")); // adding static assets (css, img, js files)

var PORT = process.env.PORT || 3000;

// DATABASE SIMULATION
var todosItems = [
  { id: 1, text: "Get Milk" },
  { id: 2, text: "Work On Project" },
];

// *********** ROUTES ***********

// GET all todos
app.get("/", function (req, res) {
  res.render("list-of-todos.ejs");
});

// Get a single todo
app.get("/todo/:id", function (req, res) {
  res.render("single-todo.ejs");
});

// Post a todo
app.post("/create-todo", function (req, res) {
  res.redirect("/");
});

app.listen(PORT, function () {
  console.log("Server is lit on PORT: " + PORT);
});
