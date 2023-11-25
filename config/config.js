// 3rd party libraries
require("dotenv").config();
const mongoose = require("mongoose");

// database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(`connected successfully to DB`))
  .catch((error) => console.log(`failed to connect to DB: ${error}`));

module.exports = mongoose;
