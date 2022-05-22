const mongoose = require("mongoose");

const EmployeeSalarySchema = new mongoose.Schema(
  {
    employee_id: {
      type: String,
      trim: true,
    },
    employee_name: {
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
    employee_start_date: {
      type: String,
      trim: true,
    },
    employee_end_date: {
      type: String,
      trim: true,
    },
    employee_working_days: {
      type: String,
      trim: true,
    },
    employee_ot: {
      type: String,
      trim: true,
    },
    employee_epf: {
      type: String,
      trim: true,
    },
    employee_etf: {
      type: String,
      trim: true,
    },
    employee_totSal: {
      type: String,
      trim: true,
    },

    isPay: {
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

module.exports = mongoose.model("employee_salary", EmployeeSalarySchema);
