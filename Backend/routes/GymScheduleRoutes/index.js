const routes = require("express").Router();
const GymRoutes = require("../../controller/gymSchedule");
const upload = require("../../utils/multer");

routes.post(
  "/add-schedule-details",
  upload.single("image"),
  GymRoutes.addGymScheduleDetails
);

routes.get("/get-all-schedule-details", GymRoutes.getAllGymScheduleDetails);

routes.get(
  "/get-monday-schedule-details",
  GymRoutes.getAllMondayGymScheduleDetails
);

routes.get(
  "/get-tuesday-schedule-details",
  GymRoutes.getAllTuesdayGymScheduleDetails
);

routes.get(
  "/get-wednesday-schedule-details",
  GymRoutes.getAllWednesdayGymScheduleDetails
);

routes.get(
  "/get-thursday-schedule-details",
  GymRoutes.getAllThursdayGymScheduleDetails
);

routes.get(
  "/get-friday-schedule-details",
  GymRoutes.getAllFridayGymScheduleDetails
);

routes.get(
  "/get-saturday-schedule-details",
  GymRoutes.getAllSaturdayGymScheduleDetails
);

routes.get(
  "/get-sunday-schedule-details",
  GymRoutes.getAllSundayGymScheduleDetails
);

routes.get(
  "/get-schedule-details-by-id/:id",
  GymRoutes.getGymScheduleDetailsById
);

routes.put(
  "/update-schedule-details/:id",
  upload.single("image"),
  GymRoutes.updateGymDetails
);

routes.delete("/delete-gym-schedule/:id", GymRoutes.deleteGymSchedule);

module.exports = routes;
