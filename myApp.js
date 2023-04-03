let express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
let app = express();

console.log("Hello World");

//serve a conole log
app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

//serve a string
/* app.get("/", (req, res) => {
  res.send("Hello Express");
}); */

//serve an HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//serve static assets
app.use("/public", express.static(__dirname + "/public"));

//serve json on a specific route
app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else res.json({ message: "Hello json" });
});

//chain middleware to create a time server
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({ time: req.time });
  }
);

//get route parameter input from the client
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

//get query parameter input from the client
app.get("/name", (req, res) => {
  res.json({ name: req.query.first + " " + req.query.last });
});

//use body-parser to parse POST requests
app.use(bodyParser.urlencoded({ extended: false }));

//get data from POST requests
app.post("/name", (req, res) => {
  res.json({ name: req.body.first + " " + req.body.last });
});

module.exports = app;
