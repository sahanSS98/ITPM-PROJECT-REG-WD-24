const routes = require("express").Router();
const StoresRoutes = require("../../controller/stores");

routes.post("/add-stores-details", StoresRoutes.addStoresScheduleDetails);

routes.get("/get-all-stores-details", StoresRoutes.getAllStoresDetails);

routes.get("/get-stores-details/:id", StoresRoutes.getStoresDetailsById);

routes.put("/update-schedule-details/:id", StoresRoutes.updateStoresDetails);

routes.delete("/delete-schedule/:id", StoresRoutes.deleteStores);

module.exports = routes;
