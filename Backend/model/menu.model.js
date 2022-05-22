const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema(
  {
    item_name: {
      type: String,
      trim: true,
    },

    item_type: {
      type: String,
      trim: true,
    },

    item_time: {
      type: String,
      trim: true,
    },

    item_price_type_small: {
      type: Number,
      trim: true,
    },

    item_price_type_medium: {
      type: Number,
      trim: true,
    },

    item_price_type_large: {
      type: Number,
      trim: true,
    },

    item_url: {
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

module.exports = mongoose.model("menu_list", MenuSchema);
