const Order = require("../model/order.model");

const OrderControllers = {
  addOrderScheduleDetails: async (req, res) => {
    try {
      const {
        food_type,
        food_name,
        qnty_type,
        qnty_price,
        qnty,
        total_price,
        user_id,
        user_name,
        item_url,
      } = req.body;

      if (
        !food_type ||
        !food_name ||
        !qnty_type ||
        !qnty ||
        !total_price ||
        !user_name ||
        !user_id
      ) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "All details must be filled.",
        });
      }

      const newOrderSchedule = new Order({
        food_type,
        food_name,
        qnty_type,
        qnty_price,
        qnty,
        total_price,
        user_id,
        user_name,
        item_url,
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

  getAllOrderDetailsByApproved: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const OrderDetails = await Order.find({
          user_id: req.params.id,
          isApprove: 1,
        });

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

  getAllOrderDetailsByCancled: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const OrderDetails = await Order.find({
          user_id: req.params.id,
          isApprove: 0,
        });

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
