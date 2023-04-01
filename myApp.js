let express = require("express");
require("dotenv").config();
let app = express();

console.log("Hello World");

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});
/* app.get("/", (req, res) => {
  res.send("Hello Express");
}); */

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else res.json({ message: "Hello json" });
});

module.exports = app;
