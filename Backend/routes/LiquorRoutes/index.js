const routes = require("express").Router();
const LiquorListRoutes = require("../../controller/liquor");
const upload = require("../../utils/multer");

routes.post(
  "/add_liquor",
  upload.single("image"),
  LiquorListRoutes.addItemToLiquorList
);

routes.get("/get_all_liqour", LiquorListRoutes.getAllLiquorItems);

routes.get("/get_liqour/:id", LiquorListRoutes.getLiquorItemsById);

// routes.put(
//   "/update-menu-item/:id",
//   upload.single("image"),
//   MenuListRoutes.updateMenuItemDetails
// );

// routes.delete("/delete-menu-item/:id", MenuListRoutes.deleteMenuItem);

module.exports = routes;
