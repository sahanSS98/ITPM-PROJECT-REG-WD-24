const Employee = require("../model/employee.salry.model");

const EmployeeControllers = {
  addEmplyeeSalary: async (req, res) => {
    try {
      const {
        employee_id,
        employee_name,
        employee_department,
        employee_post,
        employee_basicSalary,
        employee_start_date,
        employee_end_date,
        employee_working_days,
        employee_ot,
        employee_epf,
        employee_etf,
        employee_totSal,
      } = req.body;

      if (
        !employee_start_date ||
        !employee_end_date ||
        !employee_working_days ||
        !employee_ot ||
        !employee_epf ||
        !employee_etf ||
        !employee_totSal
      ) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "All details must be filled.",
        });
      }

      const employeeName = await Employee.findOne({ employee_name });
      const employeeStart_date = await Employee.findOne({
        employee_start_date,
      });
      const employeeEnd_date = await Employee.findOne({
        employee_end_date,
      });

      if (employeeName && employeeStart_date && employeeEnd_date) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: `${employeeName.employee_name}'s salry is added to ${employeeStart_date.employee_start_date} from ${employeeEnd_date.employee_end_date}`,
        });
      }

      const newEmployee = new Employee({
        employee_id,
        employee_name,
        employee_department,
        employee_post,
        employee_basicSalary,
        employee_start_date,
        employee_end_date,
        employee_working_days,
        employee_ot,
        employee_epf,
        employee_etf,
        employee_totSal,
      });

      await newEmployee.save();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        EmployeeDetails: newEmployee,
        message: "Salary added successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  getAllEmployeesSalary: async (req, res) => {
    try {
      const allEmployees = await Employee.find();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        EmployeeList: allEmployees,
        message: "All employee list recieved.",
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  getEmployeeById: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const EmployeeDetails = await Employee.findById(req.params.id);

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          EmployeeDetails: EmployeeDetails,
          message: "Employee details recieved.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  updateEmployeeDetails: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const {
          employee_name,
          employee_address,
          employee_phone,
          employee_email,
          employee_status,
          employee_nic,
          employee_education,
          employee_department,
          employee_post,
          employee_basicSalary,
        } = req.body;

        if (!validateEmail(employee_email)) {
          return res.status(200).json({
            code: 400,
            success: false,
            status: "Bad Request",
            message: "Email is invalid, Please enter a valid email",
          });
        }

        const employeeName = await Employee.findOne({ employee_name });
        const employeePhone = await Employee.findOne({ employee_phone });
        const employeeEmail = await Employee.findOne({ employee_email });
        const employeeNIC = await Employee.findOne({ employee_nic });

        if (employeeName && employeePhone && employeeEmail && employeeNIC) {
          return res.status(200).json({
            code: 400,
            success: false,
            status: "Bad Request",
            message: "This employee details already registered.",
          });
        }

        if (employeeEmail) {
          return res.status(200).json({
            code: 400,
            success: false,
            status: "Bad Request",
            message: "This employee email already registered.",
          });
        }

        if (employeePhone) {
          return res.status(200).json({
            code: 400,
            success: false,
            status: "Bad Request",
            message: "This employee phone already registered.",
          });
        }

        if (employeeName) {
          return res.status(200).json({
            code: 400,
            success: false,
            status: "Bad Request",
            message: "This employee name already registered.",
          });
        }

        await Employee.findByIdAndUpdate(req.params.id, {
          employee_name,
          employee_address,
          employee_phone,
          employee_email,
          employee_status,
          employee_nic,
          employee_education,
          employee_department,
          employee_post,
          employee_basicSalary,
        });

        const updateEmployee = await Employee.findById(req.params.id);

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          UpdateEmployee: updateEmployee,
          message: updateEmployee.employee_name + " updated successfully.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  deleteEmployee: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          EmployeeDetails: employee,
          message: employee.employee_name + " deleted successfully.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  isPaySalary: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const { isPay } = req.body;
        await Employee.findByIdAndUpdate(req.params.id, {
          isPay,
        });

        const approvePermission = await Employee.findById(req.params.id);

        if (isPay == 1) {
          return res.status(200).json({
            code: 200,
            success: true,
            status: "OK",
            UpdateOrder: approvePermission,
            message: "Payeed",
          });
        }
        if (isPay == 0) {
          return res.status(200).json({
            code: 400,
            success: false,
            status: "Bad",
            UpdateOrder: approvePermission,
            message: "Cancled",
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },
};

module.exports = EmployeeControllers;
