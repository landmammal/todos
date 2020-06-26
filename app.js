// Dependencies
var express = require("express");

// app initialization
var app = express();

// set our view engine
app.set("view engine", "ejs");

// MIDDLEWARE -------------------
app.use(express.static("public")); // adding static assets (css, img, js files)
app.use(express.urlencoded({ extended: false })); // reads the data
app.use(express.json()); // format the data coming in as an object under a property call body

var PORT = process.env.PORT || 3000;

// DATABASE SIMULATION
var todosItems = [
  { id: 1, text: "Get Milk" },
  { id: 2, text: "Work On Project" },
  { id: 3, text: "Get my Nails done" },
];

// *********** ROUTES ***********

// GET all todos
app.get("/", function (req, res) {
  res.render("list-of-todos.ejs", { list: todosItems });
});

// Get a single todo
app.get("/todo/:id", function (req, res) {
  var id = parseInt(req.params.id);
  for (let i = 0; i < todosItems.length; i++) {
    if (id === todosItems[i].id) {
      res.render("single-todo.ejs", { todo: todosItems[i] });
    }
  }
});

// Post a todo
app.post("/create-todo", function (req, res) {
  // console.log(req.body);
  var todo = req.body;
  todo.id = Math.round(Math.random() * 2000);

  todosItems.push(todo);
  res.redirect("/");
});

// Destroying deleting todo
app.get("/delete-todo/:id", function (req, res) {
  var id = parseInt(req.params.id); // grab todo id from params
  for (let i = 0; i < todosItems.length; i++) {
    if (id === todosItems[i].id) {
      todosItems.splice(i, 1);
      res.redirect("/");
    }
  }
});

// Getting Form for updating a task
app.get("/update-form/:id", function (req, res) {
  var id = parseInt(req.params.id);
  res.render("update-form.ejs", { todoID: id });
});

// update todo
app.post("/update-form/:id", function (req, res) {
  var todo = req.body;
  var id = parseInt(req.params.id);
  todo.id = id;
  console.log(todo);
  
  for (let i = 0; i < todosItems.length; i++) {
    if (id === todosItems[i].id) {
      todosItems[i] = todo;
      res.redirect("/");
    }
  }
});

app.listen(PORT, function () {
  console.log("Server is lit on PORT: " + PORT);
});
