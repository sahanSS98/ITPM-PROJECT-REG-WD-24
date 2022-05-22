const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    room_id: {
      type: String,
      trim: true,
    },
    room_name: {
      type: String,
      trim: true,
    },
    room_type: {
      type: String,
      trim: true,
    },
    bed_type: {
      type: String,
      trim: true,
    },
    person_count: {
      type: Number,
      trim: true,
    },
    room_meals: {
      type: String,
      trim: true,
    },
    room_price: {
      type: Number,
      trim: true,
    },
    room_url: {
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

module.exports = mongoose.model("room_details", RoomSchema);
