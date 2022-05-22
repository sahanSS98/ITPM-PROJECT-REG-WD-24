const mongoose = require("mongoose");

const CarParkSchema = new mongoose.Schema(
  {
    park_id: {
      type: String,
      trim: true,
    },
    parking_category: {
      type: String,
      trim: true,
    },
    parking_main_slot: {
      type: String,
      trim: true,
    },
    parking_sub_slot: {
      type: String,
      trim: true,
    },
    parking_price: {
      type: Number,
      trim: true,
    },
    parking_url: {
      type: String,
      trim: true,
    },
    cloudinary_id: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: {
      type: Date,
      default: Date.now,
    },
  }
);

module.exports = mongoose.model("parking_details", CarParkSchema);
