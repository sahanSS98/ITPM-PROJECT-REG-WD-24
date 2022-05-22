const Gym = require("../model/gym.model");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

const GymControllers = {
  addGymScheduleDetails: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "GymList",
      });
      const {
        gym_schedule_id,
        schedule_name,
        schedule_type,
        schedule_date,
        schedule_time,
        instructor_name,
        gym_price,
      } = req.body;

      if (
        !gym_schedule_id ||
        !schedule_name ||
        !schedule_type ||
        !schedule_date ||
        !schedule_time ||
        !instructor_name ||
        !gym_price
      ) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "All details must be filled.",
        });
      }

      const gymID = await Gym.findOne({ gym_schedule_id });
      const gymName = await Gym.findOne({ schedule_name });
      const gymType = await Gym.findOne({ schedule_type });
      const gymTime = await Gym.findOne({ schedule_time });
      const gymInstructor = await Gym.findOne({ instructor_name });
      const gymDate = await Gym.findOne({ schedule_date });

      if (gymID) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "This schedule id already exist.",
        });
      }

      if (gymName) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "This schedule name already exist.",
        });
      }

      // if (gymType && gymDate && gymTime) {
      //   return res.status(200).json({
      //     code: 400,
      //     success: false,
      //     status: "Bad Request",
      //     message: `This schedule already exist on every ${gymDate.schedule_date} at ${gymTime.schedule_time}.`,
      //   });
      // }

      if (gymType && gymDate && gymTime && gymInstructor) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: `This schedule already exist on every ${gymDate.schedule_date} at ${gymTime.schedule_time} and conducted by ${gymInstructor.instructor_name}.`,
        });
      }

      const newGymSchedule = new Gym({
        gym_schedule_id,
        schedule_name,
        schedule_type,
        schedule_date,
        schedule_time,
        instructor_name,
        gym_price,
        gym_url: result.secure_url,
        cloudinary_id: result.public_id,
      });

      await newGymSchedule.save();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        GymScheduleDetails: newGymSchedule,
        message: "Gym Schedule added successfully.",
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

  getAllGymScheduleDetails: async (req, res) => {
    try {
      const gymScheduleDetails = await Gym.find();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        GymScheduleDetails: gymScheduleDetails,
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

  getAllMondayGymScheduleDetails: async (req, res) => {
    try {
      const gymScheduleDetails = await Gym.find({ schedule_date: "Monday" });

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        GymScheduleDetails: gymScheduleDetails,
        message: "All gym schedule detaials recieved.",
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

  getAllTuesdayGymScheduleDetails: async (req, res) => {
    try {
      const gymScheduleDetails = await Gym.find({ schedule_date: "Tuesday" });

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        GymScheduleDetails: gymScheduleDetails,
        message: "All gym schedule detaials recieved.",
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

  getAllWednesdayGymScheduleDetails: async (req, res) => {
    try {
      const gymScheduleDetails = await Gym.find({ schedule_date: "Wednesday" });

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        GymScheduleDetails: gymScheduleDetails,
        message: "All gym schedule detaials recieved.",
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

  getAllThursdayGymScheduleDetails: async (req, res) => {
    try {
      const gymScheduleDetails = await Gym.find({ schedule_date: "Thursday" });

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        GymScheduleDetails: gymScheduleDetails,
        message: "All gym schedule detaials recieved.",
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

  getAllFridayGymScheduleDetails: async (req, res) => {
    try {
      const gymScheduleDetails = await Gym.find({ schedule_date: "Friday" });

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        GymScheduleDetails: gymScheduleDetails,
        message: "All gym schedule detaials recieved.",
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

  getAllSaturdayGymScheduleDetails: async (req, res) => {
    try {
      const gymScheduleDetails = await Gym.find({ schedule_date: "Saturday" });

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        GymScheduleDetails: gymScheduleDetails,
        message: "All gym schedule detaials recieved.",
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

  getAllSundayGymScheduleDetails: async (req, res) => {
    try {
      const gymScheduleDetails = await Gym.find({ schedule_date: "Sunday" });

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        GymScheduleDetails: gymScheduleDetails,
        message: "All gym schedule detaials recieved.",
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

  getGymScheduleDetailsById: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const gymScheduleDetails = await Gym.findById(req.params.id);

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          GymScheduleDetails: gymScheduleDetails,
          message: "All gym schedule detaials recieved.",
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

  updateGymDetails: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "GymList",
        });
        const {
          gym_schedule_id,
          schedule_name,
          schedule_type,
          schedule_date,
          schedule_time,
          instructor_name,
          gym_price,
          gym_url,
        } = req.body;

        const gymID = await Gym.findOne({ gym_schedule_id });
        const gymName = await Gym.findOne({ schedule_name });
        const gymType = await Gym.findOne({ schedule_type });
        const gymTime = await Gym.findOne({ schedule_time });
        const gymInstructor = await Gym.findOne({ instructor_name });
        const gymDate = await Gym.findOne({ schedule_date });

        if (gymName && gymType && gymDate && gymTime && gymInstructor) {
          return res.status(200).json({
            code: 400,
            success: false,
            status: "Bad Request",
            message: `This schedule already exist.`,
          });
        }

        if (gymType && gymDate && gymTime && gymInstructor) {
          return res.status(200).json({
            code: 400,
            success: false,
            status: "Bad Request",
            message: `This schedule already exist on every ${gymDate.schedule_date} at ${gymTime.schedule_time} and conducted by ${gymInstructor.instructor_name}.`,
          });
        }

        await Gym.findByIdAndUpdate(req.params.id, {
          gym_schedule_id,
          schedule_name,
          schedule_type,
          schedule_date,
          schedule_time,
          instructor_name,
          gym_price,
          gym_url: result.secure_url,
          cloudinary_id: result.public_id,
        });

        const gymScheduleDetails = await Gym.findById(req.params.id);

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          GymScheduleDetails: gymScheduleDetails,
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

  deleteGymSchedule: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const gymScheduleDetails = await Gym.findByIdAndDelete(req.params.id);
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          GymScheduleDetails: gymScheduleDetails,
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

module.exports = GymControllers;
