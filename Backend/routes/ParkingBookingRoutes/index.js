const routes = require("express").Router();
const OrderRoutes = require("../../controller/park_order");

routes.post("/park_order_place", OrderRoutes.addOrderScheduleDetails);

routes.get(
  "/get_all_park_order_details/:id",
  OrderRoutes.getAllOrderDetailsByUserId
);

routes.get("/get_all_park_order_details", OrderRoutes.getAllOrderDetails);

routes.put("/give_approve/:id", OrderRoutes.isApproveOrder);

module.exports = routes;
