const Order = require("../model/parking.order.model");

const OrderControllers = {
  addOrderScheduleDetails: async (req, res) => {
    try {
      const {
        park_id,
        parking_category,
        parking_main_slot,
        parking_sub_slot,
        parking_price,
        no_of_hours,
        total_price,
        parking_url,
        user_id,
        user_name,
      } = req.body;

      const newOrderSchedule = new Order({
        park_id,
        parking_category,
        parking_main_slot,
        parking_sub_slot,
        parking_price,
        no_of_hours,
        total_price,
        parking_url,
        user_id,
        user_name,
      });

      await newOrderSchedule.save();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        OrderScheduleDetails: newOrderSchedule,
        message: "Order placed successfully.",
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

  getAllOrderDetails: async (req, res) => {
    try {
      const OrderDetails = await Order.find();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        AllOrderDetails: OrderDetails,
        message: "All order detaials recieved.",
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

  getAllOrderDetailsByUserId: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const OrderDetails = await Order.find({ user_id: req.params.id });

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          AllOrderDetails: OrderDetails,
          message: "All order detaials recieved.",
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

  isApproveOrder: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const { isApprove } = req.body;
        await Order.findByIdAndUpdate(req.params.id, {
          isApprove,
        });

        const approvePermission = await Order.findById(req.params.id);

        if (isApprove == 1) {
          return res.status(200).json({
            code: 200,
            success: true,
            status: "OK",
            UpdateOrder: approvePermission,
            message: "Approved",
          });
        }
        if (isApprove == 0) {
          return res.status(200).json({
            code: 400,
            success: false,
            status: "Bad",
            UpdateOrder: approvePermission,
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

module.exports = OrderControllers;
