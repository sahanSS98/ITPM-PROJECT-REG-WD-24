const routes = require("express").Router();
const EmployeeRoutes = require("../../controller/employee_salary");

routes.post("/add_emp_sal", EmployeeRoutes.addEmplyeeSalary);

routes.get("/ge_all_salary", EmployeeRoutes.getAllEmployeesSalary);

routes.get("/get-employee-details/:id", EmployeeRoutes.getEmployeeById);

routes.put(
  "/update-employee-details/:id",
  EmployeeRoutes.updateEmployeeDetails
);

routes.delete("/delete-employee-details/:id", EmployeeRoutes.deleteEmployee);

routes.put("/pay_salary/:id", EmployeeRoutes.isPaySalary);

module.exports = routes;
