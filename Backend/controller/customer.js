const Customer = require("../model/customer.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendMail = require("../Mails/sendMail");

const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const { CLIENT_URL } = process.env;

const CustomerControllers = {
  registerCustomer: async (req, res) => {
    try {
      const {
        customer_name,
        customer_address,
        customer_email,
        customer_mobile_number,
        customer_password,
        customer_confirm_password,
      } = req.body;

      if (
        !customer_name ||
        !customer_address ||
        !customer_email ||
        !customer_mobile_number ||
        !customer_password ||
        !customer_confirm_password
      ) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "All details must be filled.",
        });
      }

      if (!validateEmail(customer_email)) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "Email is invalid, Please enter a valid email",
        });
      }

      const customerMail = await Customer.findOne({ customer_email });
      if (customerMail) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "This Email already registered.",
        });
      }

      if (!validatePassword(customer_password)) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message:
            "Password has 8 characters, It must have one uppercase letter, lowercase letter, number and special character.",
        });
      }

      if (customer_confirm_password != customer_password) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "Confirm Password does not match with the password.",
        });
      }

      const passwordHash = await bcrypt.hash(customer_password, 12);
      console.log(passwordHash);

      const newCustomer = {
        customer_name,
        customer_address,
        customer_email,
        customer_mobile_number,
        customer_password: passwordHash,
      };

      const activation_token = createActivationToken(newCustomer);

      const url = `${CLIENT_URL}/customer/activate/${activation_token}`;
      sendMail(
        customer_email,
        url,
        "Activate your email address",
        customer_name
      );

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        CustomerDetails: newCustomer,
        token: activation_token,
        message:
          "Your registration was successfully. Verify your email address before login.",
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

  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const newCustomer = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const {
        customer_name,
        customer_address,
        customer_email,
        customer_mobile_number,
        customer_password,
      } = newCustomer;

      const check = await Customer.findOne({ customer_email });
      if (check) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "This Email already registered.",
        });
      }

      const newCustomerDetails = new Customer({
        customer_name,
        customer_address,
        customer_email,
        customer_mobile_number,
        customer_password,
      });

      await newCustomerDetails.save();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        CustomerDetails: newCustomerDetails,
        token: activation_token,
        message: "Your email activated successfully.",
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

  CustomerLogin: async (req, res) => {
    try {
      const { customer_email, customer_password } = req.body;

      if (!customer_email || !customer_password) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "All details must be filled.",
        });
      }

      if (
        customer_email === "admin@gmail.com" &&
        customer_password === "1234"
      ) {
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          message: "Admin login was successfully.",
        });
      }

      const customer = await Customer.findOne({ customer_email });
      if (!customer) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message:
            "You are not a registerd customer. Please register before login.",
        });
      } else {
        const isMatchUserPassword = await bcrypt.compare(
          customer_password,
          customer.customer_password
        );
        if (!isMatchUserPassword) {
          return res.status(200).json({
            code: 400,
            success: false,
            status: "Bad Request",
            message: "Password does not match with this " + customer_email,
          });
        } else {
          const access_token = createAccessToken({ id: customer._id });
          res.cookie("access_token", access_token, {
            httpOnly: true,
            path: "/users/refresh_token",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });

          return res.status(200).json({
            code: 200,
            success: true,
            status: "OK",
            CustomerDetails: customer,
            token: access_token,
            message: "Your login was successfully.",
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

  getCustomerDetails: async (req, res) => {
    try {
      const customer = await Customer.findById({ _id: req.customer.id }).select(
        "-customer_password"
      );

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        CustomerDetails: customer,
        message: "Customer details recieved",
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

  updateUser: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const {
          customer_name,
          customer_address,
          customer_email,
          customer_mobile_number,
        } = req.body;
        await Customer.findByIdAndUpdate(
          { _id: req.params.id },
          {
            customer_name,
            customer_address,
            customer_email,
            customer_mobile_number,
          }
        );
        const customer = await Customer.findById(req.params.id).select(
          "-customer_password"
        );
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          CustomerDetails: customer,
          message: "Account details update successfully.",
        });
      }
    } catch (err) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: err.message,
      });
    }
  },

  deleteCustomer: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          CustomerDetails: customer,
          message: "Acount deleted successfully.",
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

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validatePassword(password) {
  var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "10m",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = CustomerControllers;
