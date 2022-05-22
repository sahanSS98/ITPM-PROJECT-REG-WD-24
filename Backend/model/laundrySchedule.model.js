const mongoose = require("mongoose");

const LaundrySchema = new mongoose.Schema(
  {
    laundry_schedule_id: {
      type: String,
      trim: true,
    },
    schedule_name: {
      type: String,
      trim: true,
    },
    schedule_type: {
      type: String,
      trim: true,
    },
    schedule_weight: {
      type: String,
      trim: true,
    },
    schedule_price: {
      type: Number,
      trim: true,
    },
    total_schedule_price: {
      type: Number,
      trim: true,
    },
    deliver_date: {
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

module.exports = mongoose.model("laundry_details", LaundrySchema);
