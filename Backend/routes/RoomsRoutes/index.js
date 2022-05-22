const routes = require("express").Router();
const RoomsRoutes = require("../../controller/room");
const upload = require("../../utils/multer");

routes.post(
  "/add-room-details",
  upload.single("image"),
  RoomsRoutes.addRoomDetails
);

routes.get("/get-all-rooms-details", RoomsRoutes.getAllRoomsDetails);

routes.get("/get-single-rooms-details", RoomsRoutes.getAllSingleRoomsDetails);

routes.get("/get-double-rooms-details", RoomsRoutes.getAllDoubleRoomsDetails);

routes.get("/get-delux-rooms-details", RoomsRoutes.getAllDeluxRoomsDetails);

routes.get("/get-luxary-rooms-details", RoomsRoutes.getAllLuxaryRoomsDetails);

routes.get("/get-room-details-by-id/:id", RoomsRoutes.getRoomById);

routes.put(
  "/update-room-details/:id",
  upload.single("image"),
  RoomsRoutes.updateRoomDetails
);

routes.delete("/delete-room/:id", RoomsRoutes.deleteRoom);

module.exports = routes;
