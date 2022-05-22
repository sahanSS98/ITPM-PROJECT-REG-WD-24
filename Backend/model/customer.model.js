const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      trim: true,
    },

    customer_address: {
      type: String,
      trim: true,
    },

    customer_email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
      sparse: true,
    },

    customer_mobile_number: {
      type: String,
      trim: true,
    },

    customer_password: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: {
      type: Date,
      default: Date.now,
    },
  }
);

module.exports = mongoose.model("Customer", CustomerSchema);
