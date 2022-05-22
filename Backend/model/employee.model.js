const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    employee_id: {
      type: String,
      trim: true,
    },
    employee_name: {
      type: String,
      trim: true,
    },
    employee_address: {
      type: String,
      trim: true,
    },
    employee_phone: {
      type: String,
      trim: true,
    },
    employee_email: {
      type: String,
      trim: true,
    },
    employee_status: {
      type: String,
      trim: true,
    },
    employee_nic: {
      type: String,
      trim: true,
    },
    employee_education: {
      type: String,
      trim: true,
    },
    employee_department: {
      type: String,
      trim: true,
    },
    employee_post: {
      type: String,
      trim: true,
    },
    employee_basicSalary: {
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

module.exports = mongoose.model("employee", EmployeeSchema);
