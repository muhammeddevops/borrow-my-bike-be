const mongoose = require("../connection");
const Schema = mongoose.Scheme


const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    linked_bike_id: {
      type: String,
    },
    credit_amount: {
      type: Number,
    },
    avatar_img_url: {
      type: String,
    },
  });

  const User = mongoose.model("users", userSchema);

  module.exports = User;
