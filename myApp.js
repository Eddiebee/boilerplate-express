let express = require("express");
let app = express();

app.use("/public", express.static(process.cwd() + "/public"));

// console.log("Hello World");

// app.get('/', (req, res) => {
//     res.send('Hello Express');
// })

app.get("/", (req, res) => {
  res.sendFile(`${__dirname + "/views/index.html"}`);
});

module.exports = app;
