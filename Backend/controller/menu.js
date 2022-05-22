const Menu = require("../model/menu.model");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

const MenuItemControllers = {
  addItemToMenuList: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "MenuList",
      });
      const {
        item_name,
        item_type,
        item_time,
        item_price_type_small,
        item_price_type_medium,
        item_price_type_large,
      } = req.body;

      // const item_price = String.

      if (
        !item_name ||
        !item_type ||
        !item_time ||
        !item_price_type_small ||
        !item_price_type_medium ||
        !item_price_type_large
      ) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "All details must be filled.",
        });
      }

      const ItemNameCheck = await Menu.findOne({ item_name });
      if (ItemNameCheck) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "This Item name already exist.",
        });
      }

      const newMenuList = new Menu({
        item_name,
        item_type,
        item_time,
        item_price_type_small,
        item_price_type_medium,
        item_price_type_large,
        item_url: result.secure_url,
        cloudinary_id: result.public_id,
      });

      await newMenuList.save();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        ItemDetails: newMenuList,
        message: "Item added successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  getAllMenuItems: async (req, res) => {
    try {
      const allMenuItem = await Menu.find().populate(
        "item_price_type",
        "type_small type_medium type_large"
      );

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        MenuItems: allMenuItem,
        message: "All menu items recieved.",
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  getMenuItemsById: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const allMenuItem = await Menu.findById(req.params.id).populate(
          "item_price_type",
          "type_small type_medium type_large"
        );

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          MenuItems: allMenuItem,
          message: "All menu items recieved.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  getAllBreakfirstMenuItems: async (req, res) => {
    try {
      const allMenuItem = await Menu.find({ item_time: "Breakfirst" }).populate(
        "item_price_type",
        "type_small type_medium type_large"
      );
      if (allMenuItem && !allMenuItem.length) {
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          message: "No item recieved.",
        });
      } else {
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          MenuItems: allMenuItem,
          message: "All menu items recieved.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  getAllLunchMenuItems: async (req, res) => {
    try {
      const allMenuItem = await Menu.find({ item_time: "Lunch" }).populate(
        "item_price_type",
        "type_small type_medium type_large"
      );
      if (allMenuItem && !allMenuItem.length) {
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          message: "No item recieved.",
        });
      } else {
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          MenuItems: allMenuItem,
          message: "All menu items recieved.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  getAllTeaTimeMenuItems: async (req, res) => {
    try {
      const allMenuItem = await Menu.find({ item_time: "Tea Time" }).populate(
        "item_price_type",
        "type_small type_medium type_large"
      );
      if (allMenuItem && !allMenuItem.length) {
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          message: "No item recieved.",
        });
      } else {
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          MenuItems: allMenuItem,
          message: "All menu items recieved.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  getAllDinnerMenuItems: async (req, res) => {
    try {
      const allMenuItem = await Menu.find({ item_time: "Dinner" }).populate(
        "item_price_type",
        "type_small type_medium type_large"
      );
      if (allMenuItem && !allMenuItem.length) {
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          message: "No item recieved.",
        });
      } else {
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          MenuItems: allMenuItem,
          message: "All menu items recieved.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  deleteMenuItem: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const menuItem = await Menu.findByIdAndDelete(req.params.id);
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          MenuItems: menuItem,
          message: menuItem.item_name + " deleted successfully.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  updateMenuItemDetails: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "MenuList",
        });
        const {
          item_name,
          item_type,
          item_time,
          item_price_type_small,
          item_price_type_medium,
          item_price_type_large,
          item_url,
        } = req.body;

        const ItemNameCheck = await Menu.findOne({ item_name });
        const ItemTypeCheck = await Menu.findOne({ item_type });
        const ItemTimeCheck = await Menu.findOne({ item_time });
        const ItemSmallCheck = await Menu.findOne({ item_price_type_small });
        const ItemMediumCheck = await Menu.findOne({ item_price_type_medium });
        const ItemLargeCheck = await Menu.findOne({ item_price_type_large });
        const ItemImageCheck = await Menu.findOne({ item_url });

        if (
          ItemNameCheck &&
          ItemTypeCheck &&
          ItemTimeCheck &&
          ItemSmallCheck &&
          ItemMediumCheck &&
          ItemLargeCheck &&
          ItemImageCheck
        ) {
          return res.status(200).json({
            code: 400,
            success: false,
            status: "Bad Request",
            message:
              "This " + ItemNameCheck.item_name + " details are already exist.",
          });
        }

        await Menu.findByIdAndUpdate(req.params.id, {
          item_name,
          item_type,
          item_time,
          item_price_type_small,
          item_price_type_medium,
          item_price_type_large,
          item_url: result.secure_url,
          cloudinary_id: result.public_id,
        });

        const menuItem = await Menu.findById(req.params.id);

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          MenuItems: menuItem,
          message: menuItem.item_name + " updated successfully.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },
};

module.exports = MenuItemControllers;
