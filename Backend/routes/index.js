const routes = require("express").Router();
const CustomerMainRoute = require("./CustomerRoutes");
const MenuListMainRoute = require("./MenuItemRoutes");
const EmployeeMainRoute = require("./EmployeeRoutes");
const RoomMainRoute = require("./RoomsRoutes");
const ParkingMainRoute = require("./ParkingRoutes");
const ScheduleMainRoute = require("./GymScheduleRoutes");
const LaundryScheduleMainRoute = require("./LaundryScheduleRoutes");
const StoresMainRoute = require("./StoresRoutes");
const OrderMainRoute = require("./OrderRoutes");
const GymMainRoute = require("./GymRoutes");
const EmpSalMainRoute = require("./EmployeeSalaryRoutes");
const LiquorMainRoute = require("./LiquorRoutes");
const LiquorOrderMainRoute = require("./LiquorOrderRoutes");
const RoomOrderMainRoute = require("./RoomOrderRoutes");
const ParkOrderMainRoute = require("./ParkingBookingRoutes");

routes.use("/customer", CustomerMainRoute);

routes.use("/menulist", MenuListMainRoute);

routes.use("/employee", EmployeeMainRoute);

routes.use("/rooms", RoomMainRoute);

routes.use("/parking", ParkingMainRoute);

routes.use("/gym-schedule", ScheduleMainRoute);

routes.use("/laundry", LaundryScheduleMainRoute);

routes.use("/stores", StoresMainRoute);

routes.use("/order", OrderMainRoute);

routes.use("/gym_book", GymMainRoute);

routes.use("/emp_sal", EmpSalMainRoute);

routes.use("/liquor", LiquorMainRoute);

routes.use("/liquor_order", LiquorOrderMainRoute);

routes.use("/room_order", RoomOrderMainRoute);

routes.use("/park_order", ParkOrderMainRoute);

module.exports = routes;
