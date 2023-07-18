const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
//user login
//route post /api/login

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Vui lòng nhập thông tin");
  }
  try {
    const matchEmail = await userModel.findOne({ email });
    if (matchEmail) {
      const matchPassword = await bcrypt.compare(password, matchEmail.password);
      if (matchPassword) {
        const accessToken = jwt.sign({
          id: matchEmail._id
        }, process.env.jwt, {
          expiresIn: "30d"
        })
        return res.status(200).json({
          _id: matchEmail._id,
          name: matchEmail.name,
          accessToken: accessToken,
          admin: matchEmail.admin,
        });
      }
    }
    return res.status(400).send("Email hoặc mật khẩu không chính xác");
  } catch (error) {
    return res.status(500).send("Đã xảy ra lỗi server");
  }
};

module.exports = {userLogin: userLogin };
