const mongoose = require("mongoose");

const GymSchema = new mongoose.Schema(
  {
    gym_schedule_id: {
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
    schedule_date: {
      type: String,
      trim: true,
    },
    schedule_time: {
      type: String,
      trim: true,
    },
    instructor_name: {
      type: String,
      trim: true,
    },
    gym_price: {
      type: Number,
      trim: true,
    },
    gym_url: {
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

module.exports = mongoose.model("gym_details", GymSchema);
