const Room = require("../model/room.model");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

const RoomControllers = {
  addRoomDetails: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "RoomList",
      });
      const {
        room_id,
        room_name,
        room_type,
        bed_type,
        person_count,
        room_meals,
        room_price,
      } = req.body;

      if (
        !room_id ||
        !room_name ||
        !room_type ||
        !bed_type ||
        !person_count ||
        !room_meals ||
        !room_price
      ) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "All details must be filled.",
        });
      }

      const RoomIdCheck = await Room.findOne({ room_id });
      const RoomNameCheck = await Room.findOne({ room_name });
      if (RoomIdCheck && RoomNameCheck) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "This room details already exist.",
        });
      }

      const newRoom = new Room({
        room_id,
        room_name,
        room_type,
        bed_type,
        person_count,
        room_meals,
        room_price,
        room_url: result.secure_url,
        cloudinary_id: result.public_id,
      });

      await newRoom.save();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        RoomDetails: newRoom,
        message: "Room added successfully.",
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

  getAllRoomsDetails: async (req, res) => {
    try {
      const roomDetails = await Room.find();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        RoomsDetails: roomDetails,
        message: "All rooms detaials recieved.",
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

  getAllSingleRoomsDetails: async (req, res) => {
    try {
      const roomDetails = await Room.find({ room_type: "Single" });

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        RoomsDetails: roomDetails,
        message: "All rooms detaials recieved.",
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

  getAllDoubleRoomsDetails: async (req, res) => {
    try {
      const roomDetails = await Room.find({ room_type: "Double" });

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        RoomsDetails: roomDetails,
        message: "All rooms detaials recieved.",
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

  getAllDeluxRoomsDetails: async (req, res) => {
    try {
      const roomDetails = await Room.find({ room_type: "Delux" });

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        RoomsDetails: roomDetails,
        message: "All rooms detaials recieved.",
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

  getAllLuxaryRoomsDetails: async (req, res) => {
    try {
      const roomDetails = await Room.find({ room_type: "Luxary" });

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        RoomsDetails: roomDetails,
        message: "All rooms detaials recieved.",
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

  getRoomById: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const roomDetails = await Room.findById(req.params.id);

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          RoomDetails: roomDetails,
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

  updateRoomDetails: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "RoomList",
        });
        const {
          room_id,
          room_name,
          room_type,
          bed_type,
          person_count,
          room_meals,
          room_price,
          room_url,
        } = req.body;

        const RoomNameCheck = await Room.findOne({ room_name });

        if (RoomNameCheck) {
          return res.status(200).json({
            code: 400,
            success: false,
            status: "Bad Request",
            message: "This " + RoomNameCheck.room_name + " is already exist.",
          });
        }

        await Room.findByIdAndUpdate(req.params.id, {
          room_id,
          room_name,
          room_type,
          bed_type,
          person_count,
          room_meals,
          room_price,
          room_url: result.secure_url,
          cloudinary_id: result.public_id,
        });

        const roomsDetails = await Room.findById(req.params.id);

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          RoomDetails: roomsDetails,
          message: roomsDetails.room_name + " updated successfully.",
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

  deleteRoom: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const roomDetails = await Room.findByIdAndDelete(req.params.id);
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          MenuIteRoomDetailsms: roomDetails,
          message: roomDetails.room_name + " deleted successfully.",
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

module.exports = RoomControllers;
