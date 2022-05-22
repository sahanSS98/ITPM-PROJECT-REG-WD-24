const Gym = require("../model/gymbook.model");

const GymControllers = {
  addGymBookDetails: async (req, res) => {
    try {
      const {
        schedule_type,
        schedule_name,
        gym_price,
        gym_schedule_id,
        instructor_name,
        schedule_date,
        schedule_time,
        user_id,
        user_name,
        fees_type,
        total_price,
        gym_url,
      } = req.body;

      if (
        !schedule_type ||
        !schedule_name ||
        !gym_price ||
        !gym_schedule_id ||
        !gym_schedule_id ||
        !instructor_name ||
        !schedule_date ||
        !schedule_time ||
        !user_id ||
        !user_name ||
        !fees_type ||
        !total_price ||
        !gym_url
      ) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "All details must be filled.",
        });
      }

      const newGymSchedule = new Gym({
        schedule_type,
        schedule_name,
        gym_price,
        gym_schedule_id,
        instructor_name,
        schedule_date,
        schedule_time,
        user_id,
        user_name,
        fees_type,
        total_price,
        gym_url,
      });

      await newGymSchedule.save();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        GymScheduleDetails: newGymSchedule,
        message: "Gym Booked successfully.",
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

  getAllGymDetails: async (req, res) => {
    try {
      const GymDetails = await Gym.find();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        AllGymDetails: GymDetails,
        message: "All Gym detaials recieved.",
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

  getAllGymDetailsByUserId: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const GymDetails = await Gym.find({ user_id: req.params.id });

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          AllGymDetails: GymDetails,
          message: "All Gym detaials recieved.",
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

  getAllGymDetailsByApproved: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const GymDetails = await Gym.find({
          user_id: req.params.id,
          isApprove: 1,
        });

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          AllGymDetails: GymDetails,
          message: "All Gym detaials recieved.",
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

  getAllGymDetailsByCancled: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const GymDetails = await Gym.find({
          user_id: req.params.id,
          isApprove: 0,
        });

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          AllGymDetails: GymDetails,
          message: "All Gym detaials recieved.",
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

  isApproveGym: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const { isApprove } = req.body;
        await Gym.findByIdAndUpdate(req.params.id, {
          isApprove,
        });

        const approvePermission = await Gym.findById(req.params.id);

        if (isApprove == 1) {
          return res.status(200).json({
            code: 200,
            success: true,
            status: "OK",
            UpdateGym: approvePermission,
            message: "Approved",
          });
        }
        if (isApprove == 0) {
          return res.status(200).json({
            code: 400,
            success: false,
            status: "Bad",
            UpdateGym: approvePermission,
            message: "Cancled",
          });
        }
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
