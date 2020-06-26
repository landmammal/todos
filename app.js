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
  { id: 3, text: "Get my Nails done" }
];

// *********** ROUTES ***********

// GET all todos
app.get("/", function (req, res) {
  res.render("list-of-todos.ejs", {list: todosItems });
});

// Get a single todo
app.get("/todo/:id", function (req, res) {
  var id = parseInt(req.params.id)
  for (let i = 0; i < todosItems.length; i++) {
    if (id === todosItems[i].id) {      
      res.render("single-todo.ejs", {todo: todosItems[i]});
    }    
  }
});

// Post a todo
app.post("/create-todo", function (req, res) {
  res.redirect("/");
});

app.listen(PORT, function () {
  console.log("Server is lit on PORT: " + PORT);
});
