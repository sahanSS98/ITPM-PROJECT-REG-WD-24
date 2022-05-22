const routes = require("express").Router();
const OrderRoutes = require("../../controller/liquor_order");

routes.post("/liquor_order_place", OrderRoutes.addOrderScheduleDetails);

routes.get(
  "/get_all_liquor_order_details/:id",
  OrderRoutes.getAllOrderDetailsByUserId
);

routes.get("/get_all_order_details", OrderRoutes.getAllOrderDetails);

routes.put("/give_approve/:id", OrderRoutes.isApproveOrder);

module.exports = routes;
