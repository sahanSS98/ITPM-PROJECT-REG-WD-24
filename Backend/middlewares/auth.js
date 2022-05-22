const webToken = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(400).json({
        code: 400,
        success: false,
        status: "Bad Request",
        message: "Invalid Authentication to the visit this route",
      });
    } else {
      webToken.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (error, customer) => {
          if (error) {
            return res.status(500).json({
              code: 500,
              success: false,
              status: "Internal Server Error",
              message: error.message,
            });
          } else {
            req.customer = customer;
            console.log(customer);
            next();
          }
        }
      );
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      status: "Internal Server Error",
      message: error.message,
    });
  }
};

module.exports = auth;
