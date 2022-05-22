const routes = require("express").Router();
const LaundryRoutes = require("../../controller/laundry");
const upload = require("../../utils/multer");

routes.post(
  "/add-laundry-schedule-details",
  LaundryRoutes.addLaundryScheduleDetails
);

routes.get(
  "/get-all-schedule-details",
  LaundryRoutes.getAllLaundryScheduleDetails
);

routes.get("/get-schedule-details/:id", LaundryRoutes.getLaundryScheduleDetailsById);

routes.put("/update-schedule-details/:id", LaundryRoutes.updateLaundryDetails);

routes.delete("/delete-schedule/:id", LaundryRoutes.deleteLaundrySchedule);

module.exports = routes;
