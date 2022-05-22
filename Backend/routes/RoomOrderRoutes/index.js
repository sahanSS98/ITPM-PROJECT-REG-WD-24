const routes = require("express").Router();
const OrderRoutes = require("../../controller/room_order");

routes.post("/room_order_place", OrderRoutes.addOrderScheduleDetails);

routes.get(
  "/get_all_room_order_details/:id",
  OrderRoutes.getAllOrderDetailsByUserId
);

routes.get("/get_all_room_order_details", OrderRoutes.getAllOrderDetails);

routes.put("/give_approve/:id", OrderRoutes.isApproveOrder);

module.exports = routes;
