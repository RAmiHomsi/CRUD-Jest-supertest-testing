// 3rd party libraries
const express = require("express");

// own files
require("./config/config");
const restRouter = require("./src/api/api-routes");

// create app instance and get port
const app = express();
const port = process.env.PORT;

// configure app
app.use(express.json());

// map the app routes
app.use("/api", restRouter);

// bind app to the PORT
const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

module.exports = server;
