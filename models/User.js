const { Schema, model } = require("mongoose");


/*
 * User Schema
 * */

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    maxLength: [50, "Username cannot exceed 50 characters"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    maxLength: [100, "Email cannot exceed 100 characters."],
    match: [/^\w+@\w+\.\w+\.?\w?/ig, "{VALUE} is not avalid email address"],
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  last_login: Date
}, {
  timestamps: { createdAt: "date_created", updatedAt: "last_updated" }
});


module.exports = model("User", UserSchema);

