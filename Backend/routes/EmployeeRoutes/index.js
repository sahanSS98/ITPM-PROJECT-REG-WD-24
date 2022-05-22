const routes = require("express").Router();
const EmployeeRoutes = require("../../controller/employee");

routes.post("/register-employee", EmployeeRoutes.addEmplyer);

routes.get("/get-all-employee", EmployeeRoutes.getAllEmployees);

routes.get("/get-employee-details/:id", EmployeeRoutes.getEmployeeById);

routes.put(
  "/update-employee-details/:id",
  EmployeeRoutes.updateEmployeeDetails
);

routes.delete("/delete-employee-details/:id", EmployeeRoutes.deleteEmployee);

module.exports = routes;
