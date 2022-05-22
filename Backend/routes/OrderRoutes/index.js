const routes = require("express").Router();
const OrderRoutes = require("../../controller/order.js");

routes.post("/order_place", OrderRoutes.addOrderScheduleDetails);

routes.get("/get_all_order_details", OrderRoutes.getAllOrderDetails);

routes.get(
  "/get_all_order_details/:id",
  OrderRoutes.getAllOrderDetailsByUserId
);

routes.get(
  "/get_all_approve_order_details/:id",
  OrderRoutes.getAllOrderDetailsByApproved
);

routes.get(
  "/get_all_cancle_order_details/:id",
  OrderRoutes.getAllOrderDetailsByCancled
);

routes.put("/give_approve/:id", OrderRoutes.isApproveOrder);

module.exports = routes;
