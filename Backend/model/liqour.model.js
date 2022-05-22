const mongoose = require("mongoose");

const LiqourSchema = new mongoose.Schema(
  {
    liquor_id: {
      type: String,
      trim: true,
    },

    liquor_name: {
      type: String,
      trim: true,
    },

    liquor_type: {
      type: String,
      trim: true,
    },

    liquor_qnty: {
      type: String,
      trim: true,
    },

    liquor_price: {
      type: String,
      trim: true,
    },

    liquor_url: {
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

module.exports = mongoose.model("liquor_list", LiqourSchema);
