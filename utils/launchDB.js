const mongoose = require("mongoose");


function launchDB(dbURI) {
  return mongoose.connect(dbURI);
}


module.exports = launchDB;

