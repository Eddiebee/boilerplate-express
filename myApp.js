require("dotenv").config();
let bodyParser = require("body-parser");
let express = require("express");
let app = express();

// Middleware functions are fncs that take 3 args:
app.use("/public", express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

// the request object, the response object, and the next function in the app's request-response cycle.

// simple logger
app.use((req, res, next) => {
  const output = `${req.method + " " + req.path + " - " + req.ip}`;
  console.log(output);
  next();
});
// console.log("Hello World");

// app.get('/', (req, res) => {
//     res.send('Hello Express');
// })

app.get("/", (req, res) => {
  res.sendFile(`${__dirname + "/views/index.html"}`);
});

// send json response
app.get("/json", (req, res) => {
  let msg = "Hello json";
  res.json({
    message:
      process.env.MESSAGE_STYLE === "uppercase" ? msg.toUpperCase() : msg,
  });
});

// chain a middleware function
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

// get route parameter input from the client
app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({ echo: word });
});

// another way to get the input from the client is by encoding the data after the route path, using a query string. The query string is delimited by a question mark (?), and includes field=value couples.
app.get("/name", (req, res) => {
  const { first, last } = req.query;
  const name = `${first} ${last}`;
  res.json({ name });
});

// use body-parser to parse POST requests

module.exports = app;
