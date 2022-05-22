const mongoose = require("mongoose");

const StoresSchema = new mongoose.Schema(
  {
    item_id: {
      type: String,
      trim: true,
    },
    item_name: {
      type: String,
      trim: true,
    },
    item_type: {
      type: String,
      trim: true,
    },
    item_add_date: {
      type: String,
      trim: true,
    },
    item_qnty: {
      type: Number,
      trim: true,
    },
    item_price: {
      type: Number,
      trim: true,
    },
    total_item_price: {
      type: Number,
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

module.exports = mongoose.model("stores_details", StoresSchema);
