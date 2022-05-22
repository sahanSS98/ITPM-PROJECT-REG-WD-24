const Laundry = require("../model/laundrySchedule.model");

const LaundryControllers = {
  addLaundryScheduleDetails: async (req, res) => {
    try {
      const {
        laundry_schedule_id,
        schedule_name,
        schedule_type,
        schedule_weight,
        deliver_date,
        schedule_price,
        total_schedule_price,
      } = req.body;

      if (
        !laundry_schedule_id ||
        !schedule_name ||
        !schedule_type ||
        !schedule_weight ||
        !deliver_date ||
        !schedule_price ||
        !total_schedule_price
      ) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "All details must be filled.",
        });
      }

      const scheduleId = await Laundry.findOne({ laundry_schedule_id });
      const scheduleName = await Laundry.findOne({ schedule_name });
      const scheduleType = await Laundry.findOne({ schedule_type });
      const scheduleWeight = await Laundry.findOne({ schedule_weight });

      if (scheduleId) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: `This ${scheduleId.laundry_schedule_id} id already exist.`,
        });
      }

      if (scheduleName) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: `This ${scheduleName.schedule_name} already exist.`,
        });
      }

      if (scheduleType && scheduleWeight) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: `This schedule type(${scheduleType.schedule_type}) and schedule weight(${scheduleWeight.schedule_weight}) is already exists.`,
        });
      }

      if (scheduleName && scheduleType && scheduleWeight) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: `This schedule already exists.`,
        });
      }

      const newLaundrySchedule = new Laundry({
        laundry_schedule_id,
        schedule_name,
        schedule_type,
        schedule_weight,
        deliver_date,
        schedule_price,
        total_schedule_price,
      });

      await newLaundrySchedule.save();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        LaundryScheduleDetails: newLaundrySchedule,
        message: "Laundry Schedule added successfully.",
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

  getAllLaundryScheduleDetails: async (req, res) => {
    try {
      const LaundryScheduleDetails = await Laundry.find();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        LaundryScheduleDetails: LaundryScheduleDetails,
        message: "All schedule detaials recieved.",
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

  getLaundryScheduleDetailsById: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const laundryScheduleDetails = await Laundry.findById(req.params.id);

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          LaundryScheduleDetails: laundryScheduleDetails,
          message: "All laundry schedule detaials recieved.",
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

  updateLaundryDetails: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const {
          laundry_schedule_id,
          schedule_name,
          schedule_type,
          schedule_weight,
          deliver_date,
          schedule_price,
          total_schedule_price,
        } = req.body;

        await Laundry.findByIdAndUpdate(req.params.id, {
          laundry_schedule_id,
          schedule_name,
          schedule_type,
          schedule_weight,
          deliver_date,
          schedule_price,
          total_schedule_price,
        });

        const LaundryScheduleDetails = await Laundry.findById(req.params.id);

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          LaundryScheduleDetails: LaundryScheduleDetails,
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

  deleteLaundrySchedule: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const LaundryScheduleDetails = await Laundry.findByIdAndDelete(
          req.params.id
        );
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          LaundryScheduleDetails: LaundryScheduleDetails,
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

module.exports = LaundryControllers;
