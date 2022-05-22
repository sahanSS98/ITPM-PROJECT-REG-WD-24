const routes = require("express").Router();
const MenuListRoutes = require("../../controller/menu");
const upload = require("../../utils/multer");

routes.post(
  "/add-item-to-menu",
  upload.single("image"),
  MenuListRoutes.addItemToMenuList
);

routes.get("/get-all-menu-items", MenuListRoutes.getAllMenuItems);

routes.get(
  "/get-all-breakfirst-menu-items",
  MenuListRoutes.getAllBreakfirstMenuItems
);

routes.get("/get-all-lunch-menu-items", MenuListRoutes.getAllLunchMenuItems);

routes.get(
  "/get-all-teatime-menu-items",
  MenuListRoutes.getAllTeaTimeMenuItems
);

routes.get("/get-all-dinner-menu-items", MenuListRoutes.getAllDinnerMenuItems);

routes.get("/get-menu-item-by-id/:id", MenuListRoutes.getMenuItemsById);

routes.put(
  "/update-menu-item/:id",
  upload.single("image"),
  MenuListRoutes.updateMenuItemDetails
);

routes.delete("/delete-menu-item/:id", MenuListRoutes.deleteMenuItem);

module.exports = routes;
