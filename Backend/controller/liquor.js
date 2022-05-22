const Liquor = require("../model/liqour.model");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

const LiquorItemControllers = {
  addItemToLiquorList: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "LiquorList",
      });
      const { liquor_id, liquor_name, liquor_type, liquor_qnty, liquor_price } =
        req.body;

      if (
        !liquor_id ||
        !liquor_name ||
        !liquor_type ||
        !liquor_qnty ||
        !liquor_price
      ) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "All details must be filled.",
        });
      }

      const ItemNameCheck = await Liquor.findOne({ liquor_name });
      if (ItemNameCheck) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "This Item name already exist.",
        });
      }

      const newLiquorList = new Liquor({
        liquor_id,
        liquor_name,
        liquor_type,
        liquor_qnty,
        liquor_price,
        liquor_url: result.secure_url,
        cloudinary_id: result.public_id,
      });

      await newLiquorList.save();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        ItemDetails: newLiquorList,
        message: "Liquor added successfully.",
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

  getAllLiquorItems: async (req, res) => {
    try {
      const allLiquorItem = await Liquor.find();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        LiquorItems: allLiquorItem,
        message: "All Liquor items recieved.",
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

  getLiquorItemsById: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const allLiquorItem = await Liquor.findById(req.params.id);
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          LiquorItems: allLiquorItem,
          message: "All Liquor items recieved.",
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

  deleteLiquorItem: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const LiquorItem = await Liquor.findByIdAndDelete(req.params.id);
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          LiquorItems: LiquorItem,
          message: LiquorItem.item_name + " deleted successfully.",
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

  updateLiquorItemDetails: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "LiquorList",
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

        const ItemNameCheck = await Liquor.findOne({ item_name });
        const ItemTypeCheck = await Liquor.findOne({ item_type });
        const ItemTimeCheck = await Liquor.findOne({ item_time });
        const ItemSmallCheck = await Liquor.findOne({ item_price_type_small });
        const ItemMediumCheck = await Liquor.findOne({
          item_price_type_medium,
        });
        const ItemLargeCheck = await Liquor.findOne({ item_price_type_large });
        const ItemImageCheck = await Liquor.findOne({ item_url });

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

        await Liquor.findByIdAndUpdate(req.params.id, {
          item_name,
          item_type,
          item_time,
          item_price_type_small,
          item_price_type_medium,
          item_price_type_large,
          item_url: result.secure_url,
          cloudinary_id: result.public_id,
        });

        const LiquorItem = await Liquor.findById(req.params.id);

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          LiquorItems: LiquorItem,
          message: LiquorItem.item_name + " updated successfully.",
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

module.exports = LiquorItemControllers;
