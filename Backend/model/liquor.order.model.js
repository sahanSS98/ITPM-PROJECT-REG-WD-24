const mongoose = require("mongoose");

const OrderLiquorSchema = new mongoose.Schema(
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

    liquor_qntity: {
      type: String,
      trim: true,
    },
    liquor_url: {
      type: String,
      trim: true,
    },
    total_price: {
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

module.exports = mongoose.model("liquor_order_details", OrderLiquorSchema);
