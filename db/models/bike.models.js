const mongoose = require("../connection");
const Schema = mongoose.Scheme;

const bikeSchema = new mongoose.Schema({
  bike_owner: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  rented_by: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  location: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  time_available: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  bike_img_url: {
    type: String,
    required: false,
  },
  is_available: {
    type: Boolean,
    required: true,
  },
  combination: {
    type: Number,
    required: true,
  },
});

const Bike = mongoose.model("Bike", bikeSchema);

module.exports = Bike;
