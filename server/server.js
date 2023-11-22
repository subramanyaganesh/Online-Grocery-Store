const express = require("express");
const bodyParser = require("body-parser");
const Controller = require("./controller/SQLController");
const MongoController = require("./controller/MongoController");
const app = express();
const port = 3001;
const controller = new Controller();
const mongocontrollers = new MongoController();
app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/login", (req, res) => {
  const { username, password, usertype } = req.body;
  const query =
    "SELECT * FROM Users WHERE username = ? AND password = ? AND usertype = ?";

  const result = controller.getFromDatabase(res, query, [
    username,
    password,
    usertype,
  ]);
});

app.get("/user", (req, res) => {
  // Replace 'your_table' with your actual table name
  console.log("req", req.query);
  const queryoptions =
    req.query.usertype != null ? { usertype: req.query.usertype } : true;
  let query = "SELECT * FROM Users WHERE ?";

  db.query(query, queryoptions, (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    // console.log(results);
    res.json(results);
  });
});

app.post("/register", (req, res) => {
  const requestData = req.body;
  console.log("body", req.body);
  const query = "INSERT INTO Users SET ?";

  db.query(query, requestData, (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    // console.log(results);
    res.json({ msg: "User registered" });
  });
});
// Register customer order API

app.post("/order", (req, res) => {
  const requestData = req.body;
  console.log("body", req.body);
  const query = "INSERT INTO customerorders SET ?";

  db.query(query, requestData, (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    // console.log(results);
    res.json({ msg: "order registered" });
  });
});

app.post("/viewReviews", (req, res) => {
  mongocontrollers.getReviewsFromDatabase(res, req.body);
});

app.post("/writeReview", (req, res) => {
  console.log("write review has a body=", req.body);
  mongocontrollers.setReviewsToDatabase(res, req.body);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
