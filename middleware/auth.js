const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const auth = async (req, res, next) => {
    try {
      let token;
      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        const decodedJwt = jwt.verify(token, process.env.jwt);
        req.user = await userModel.findById(decodedJwt.id).select("-password");
        next();
      } else {
        return res.status(401).send("Unauthorized");
      }
    } catch (err) {
      return res.status(401).send("Unauthorized");
    }
  };
  
  module.exports = auth;