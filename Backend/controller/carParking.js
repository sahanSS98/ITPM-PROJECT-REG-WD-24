const Parking = require("../model/carPark.model");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

const CarParkingControllers = {
  addParkingDetails: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "CarParkingList",
      });
      const {
        park_id,
        parking_category,
        parking_main_slot,
        parking_sub_slot,
        parking_price,
      } = req.body;

      if (
        !park_id ||
        !parking_category ||
        !parking_main_slot ||
        !parking_sub_slot ||
        !parking_price
      ) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "All details must be filled.",
        });
      }

      const ParkingID = await Parking.findOne({ park_id });
      const ParkingCategory = await Parking.findOne({ parking_category });
      const MainSlot = await Parking.findOne({ parking_main_slot });
      const SubSlot = await Parking.findOne({ parking_sub_slot });

      if (ParkingID) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: `This ${ParkingID.park_id} is already exists.`,
        });
      }

      if (MainSlot && SubSlot) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: `This sub slot(${SubSlot.parking_sub_slot}) of main slot ${MainSlot.parking_main_slot} is reserved by parking of ${ParkingCategory.parking_category}  `,
        });
      }

      const newCarParking = new Parking({
        park_id,
        parking_category,
        parking_main_slot,
        parking_sub_slot,
        parking_price,
        parking_url: result.secure_url,
        cloudinary_id: result.public_id,
      });

      await newCarParking.save();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        ParkingDetails: newCarParking,
        message: "Parking Details added successfully.",
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

  getAllParkingDetails: async (req, res) => {
    try {
      const parkingDetails = await Parking.find();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        ParkingDetails: parkingDetails,
        message: "All parking detaials recieved.",
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

  getAllCarParkingDetails: async (req, res) => {
    try {
      const parkingDetails = await Parking.find({ parking_category: "Car" });

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        ParkingDetails: parkingDetails,
        message: "All parking detaials recieved.",
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

  getAllVanParkingDetails: async (req, res) => {
    try {
      const parkingDetails = await Parking.find({ parking_category: "Van" });

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        ParkingDetails: parkingDetails,
        message: "All parking detaials recieved.",
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

  getAllBusParkingDetails: async (req, res) => {
    try {
      const parkingDetails = await Parking.find({ parking_category: "Bus" });

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        ParkingDetails: parkingDetails,
        message: "All parking detaials recieved.",
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

  getAllOtherParkingDetails: async (req, res) => {
    try {
      const parkingDetails = await Parking.find({ parking_category: "Other" });

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        ParkingDetails: parkingDetails,
        message: "All parking detaials recieved.",
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

  getParkingById: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const parkingDetails = await Parking.findById(req.params.id);

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          ParkingDetails: parkingDetails,
          message: "All room details recieved.",
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

  updateParkingDetails: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "CarParkingList",
        });
        const {
          park_id,
          parking_category,
          parking_main_slot,
          parking_sub_slot,
          parking_price,
          parking_url,
        } = req.body;

        const ParkingCategory = await Parking.findOne({ parking_category });
        const MainSlot = await Parking.findOne({ parking_main_slot });
        const SubSlot = await Parking.findOne({ parking_sub_slot });
        const Price = await Parking.findOne({ parking_price });
        const ID = await Parking.findOne({ park_id });

        if (!ParkingCategory && MainSlot && SubSlot) {
          return res.status(200).json({
            code: 400,
            success: false,
            status: "Bad Request",
            message: `This sub slot(${SubSlot.parking_sub_slot}) of main slot ${MainSlot.parking_main_slot} is reserved by parking of ${ParkingCategory.parking_category}  `,
          });
        }

        await Parking.findByIdAndUpdate(req.params.id, {
          park_id,
          parking_category,
          parking_main_slot,
          parking_sub_slot,
          parking_price,
          parking_url: result.secure_url,
          cloudinary_id: result.public_id,
        });

        const parkingDetails = await Parking.findById(req.params.id);

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          ParkingDetails: parkingDetails,
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

  deleteParking: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const parkingDetails = await Parking.findByIdAndDelete(req.params.id);
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          ParkingDetails: parkingDetails,
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

module.exports = CarParkingControllers;
