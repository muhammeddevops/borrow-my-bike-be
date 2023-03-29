const mongoose = require("../connection");
const Schema = mongoose.Scheme

const bikeSchema = new mongoose.Schema({
    bike_owner: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    rented_by: {
      type: String,
    },
    bike_type: {
      type: String,
      required: true,
    },
    location: {
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
    },
    qr_url: {
      type: String,
      required: true,
    },
    bike_image_url: {
      type: String,
      required: false,
    },
  });
  
  const Bike = mongoose.model("Bike", bikeSchema);

  module.exports = Bike
