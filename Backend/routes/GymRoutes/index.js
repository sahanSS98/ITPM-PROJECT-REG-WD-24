const routes = require("express").Router();
const GymRoutes = require("../../controller/gymbook");

routes.post("/gym_booking", GymRoutes.addGymBookDetails);

routes.get("/get_all_gym_details", GymRoutes.getAllGymDetails);

// routes.get(
//   "/get_all_Gym_details/:id",
//   GymRoutes.getAllGymDetailsByUserId
// );

routes.get(
  "/get_all_approve_gym_booking/:id",
  GymRoutes.getAllGymDetailsByApproved
);

// routes.get(
//   "/get_all_cancle_Gym_details/:id",
//   GymRoutes.getAllGymDetailsByCancled
// );

routes.put("/give_approve/:id", GymRoutes.isApproveGym);

module.exports = routes;
