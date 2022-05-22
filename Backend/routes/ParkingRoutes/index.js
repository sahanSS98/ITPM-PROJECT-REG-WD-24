const routes = require("express").Router();
const ParkingRoutes = require("../../controller/carParking");
const upload = require("../../utils/multer");

routes.post(
  "/add-parking-details",
  upload.single("image"),
  ParkingRoutes.addParkingDetails
);

routes.get("/get-all-parking-details", ParkingRoutes.getAllParkingDetails);

routes.get("/get-car-parking-details", ParkingRoutes.getAllCarParkingDetails);

routes.get("/get-van-parking-details", ParkingRoutes.getAllVanParkingDetails);

routes.get("/get-bus-parking-details", ParkingRoutes.getAllBusParkingDetails);

routes.get(
  "/get-other-parking-details",
  ParkingRoutes.getAllOtherParkingDetails
);

routes.get("/get-parking-details-by-id/:id", ParkingRoutes.getParkingById);

routes.put(
  "/update-parking-details/:id",
  upload.single("image"),
  ParkingRoutes.updateParkingDetails
);

routes.delete("/delete-parking/:id", ParkingRoutes.deleteParking);

module.exports = routes;
