const mongoose = require("mongoose");

const BookGymSchema = new mongoose.Schema(
  {
    schedule_type: {
      type: String,
      trim: true,
    },
    schedule_name: {
      type: String,
      trim: true,
    },
    gym_price: {
      type: String,
      trim: true,
    },

    gym_schedule_id: {
      type: String,
      trim: true,
    },
    instructor_name: {
      type: String,
      trim: true,
    },
    schedule_date: {
      type: String,
      trim: true,
    },
    schedule_time: {
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
    fees_type: {
      type: String,
      trim: true,
    },
    total_price: {
      type: String,
      trim: true,
    },
    gym_url: {
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

module.exports = mongoose.model("BookGymSchema", BookGymSchema);
