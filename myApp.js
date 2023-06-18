let express = require("express");
let app = express();


// console.log("Hello World");

// app.get('/', (req, res) => {
//     res.send('Hello Express');
// })

app.get("/", (req, res) => {
  const absPath = __dirname + "/views/index.html";
  res.sendFile(absPath);
});

module.exports = app;
