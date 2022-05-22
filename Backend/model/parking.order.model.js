const mongoose = require("mongoose");

const BookParkingomSchema = new mongoose.Schema(
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
      type: String,
      trim: true,
    },

    no_of_hours: {
      type: String,
      trim: true,
    },

    total_price: {
      type: String,
      trim: true,
    },

    parking_url: {
      type: String,
      trim: true,
    },

    user_id: {
      type: String,
      trim: true,
    },
    user_name: {
      type: String,
      trim: true,
    },
    isApprove: {
      type: Number,
      default: 2,
    },
  },
  {
    timestamps: {
      type: Date,
      default: Date.now,
    },
  }
);

module.exports = mongoose.model("book_parking_details", BookParkingomSchema);
