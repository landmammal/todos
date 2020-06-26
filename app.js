// Dependencies
var express = require("express");
var mysql = require("mysql");

// app initialization
var app = express();

// set our view engine
app.set("view engine", "ejs");

// MIDDLEWARE -------------------
app.use(express.static("public")); // adding static assets (css, img, js files)
app.use(express.urlencoded({ extended: false })); // reads the data
app.use(express.json()); // format the data coming in as an object under a property call body

var PORT = process.env.PORT || 3000;

// DATABASE Connection
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "todolist",
});

db.connect(function (error) {
  if (error) throw error;

  console.log("MYSQL is connected");
});

// *********** ROUTES ***********

// GET all todos
app.get("/", function (req, res) {
  var sql = "SELECT * FROM todos";
  db.query(sql, function (err, results) {
    if (err) throw err;
    // console.log(results);
    res.render("list-of-todos.ejs", { list: results });
  });
});

// Get a single todo
app.get("/todo/:id", function (req, res) {
  var sql = "SELECT * FROM todos WHERE ?";
  db.query(sql, [{ id: req.params.id }], function (err, results) {
    if (err) throw err;
    // console.log(results);
    res.render("single-todo.ejs", { todo: results[0] });
  });
});

// Post a todo
app.post("/create-todo", function (req, res) {
  // console.log(req.body);
  var todo = req.body;

  var sql = "INSERT INTO todos SET ?";
  db.query(sql, todo, function (err, result) {
    if (err) throw err;
    res.redirect("/");
  });
});

// Destroying deleting todo
app.get("/delete-todo/:id", function (req, res) {
  var sql = "DELETE FROM todos WHERE ?";
  db.query(sql, [{ id: req.params.id }], function (err, results) {
    if (err) throw err;
    // console.log(results);

    res.redirect("/");
  });
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
  // console.log(todo);
  var sql = "UPDATE todos SET ? WHERE ?";
  db.query(sql, [todo, { id: id }], function (err, results) {
    if (err) throw err;
    // console.log(results);

    res.redirect("/");
  });
});

app.listen(PORT, function () {
  console.log("Server is lit on PORT: " + PORT);
});
