const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

const auth = async (req, res, next) => {
  const token = req.session.accessToken;
console.log("this is token", token)
  if (token) {
    try {
      const decodeToken = jwt.verify(token, process.env.jwt);
      console.log("this is decode token", decodeToken)
      req.user = await userModel.findOne({ _id: decodeToken._id }).select("-password");
      next(); // Gọi next() để tiếp tục xử lý request
    } catch (error) {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
};

module.exports = auth;
