const mongoose = require("mongoose");

const OrderFoodSchema = new mongoose.Schema(
  {
    food_type: {
      type: String,
      trim: true,
    },
    food_name: {
      type: String,
      trim: true,
    },
    qnty_type: {
      type: String,
      trim: true,
    },

    qnty: {
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
    item_url: {
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

module.exports = mongoose.model("Order_details", OrderFoodSchema);
