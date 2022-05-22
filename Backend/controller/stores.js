const Stores = require("../model/store.model");

const StoresControllers = {
  addStoresScheduleDetails: async (req, res) => {
    try {
      const {
        item_id,
        item_name,
        item_type,
        item_add_date,
        item_qnty,
        item_price,
        total_item_price,
      } = req.body;

      if (
        !item_id ||
        !item_name ||
        !item_type ||
        !item_add_date ||
        !item_qnty ||
        !item_price ||
        !total_item_price
      ) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "All details must be filled.",
        });
      }

      const ItemId = await Stores.findOne({ item_id });
      const ItemName = await Stores.findOne({ item_name });

      if (ItemId) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: `This ${ItemId.item_id} id already exist.`,
        });
      }

      if (ItemName) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: `This ${ItemName.item_name} is already exist.`,
        });
      }

      const newStoresSchedule = new Stores({
        item_id,
        item_name,
        item_type,
        item_add_date,
        item_qnty,
        item_price,
        total_item_price,
      });

      await newStoresSchedule.save();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        StoresScheduleDetails: newStoresSchedule,
        message: "Stores details added successfully.",
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

  getAllStoresDetails: async (req, res) => {
    try {
      const StoresScheduleDetails = await Stores.find();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        StoresScheduleDetails: StoresScheduleDetails,
        message: "All Stores detaials recieved.",
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

  getStoresDetailsById: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const StoresScheduleDetails = await Stores.findById(req.params.id);

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          StoresScheduleDetails: StoresScheduleDetails,
          message: "All stores detaials recieved.",
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

  updateStoresDetails: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const {
          item_id,
          item_name,
          item_type,
          item_add_date,
          item_qnty,
          item_price,
          total_item_price,
        } = req.body;

        await Stores.findByIdAndUpdate(req.params.id, {
          item_id,
          item_name,
          item_type,
          item_add_date,
          item_qnty,
          item_price,
          total_item_price,
        });

        const StoresScheduleDetails = await Stores.findById(req.params.id);

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          StoresScheduleDetails: StoresScheduleDetails,
          message: "Updated successfully.",
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

  deleteStores: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const StoresScheduleDetails = await Stores.findByIdAndDelete(
          req.params.id
        );
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          StoresScheduleDetails: StoresScheduleDetails,
          message: "Deleted successfully.",
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

module.exports = StoresControllers;
