const userModel = require('../model/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

// register new user
// post /api/register
async function register(req, res) {
  try {
    const { name, email, password, confirmpassword } = req.body;
    console.log(name);

    if (!name || !email || !password || !confirmpassword) {
      return res.status(400).render('register', { err: "Vui lòng nhập thông tin để đăng ký tài khoản" });
    }

    if (password.length < 8 || !passwordRegex.test(password)) {
      return res.status(400).render('register', { err: "Mật khẩu phải chứa ít nhất 8 ký tự, gồm ít nhất 1 chữ thường, 1 chữ hoa và 1 số" });
    }

    if (password !== confirmpassword) {
      return res.status(400).render('register', { err: "Mật khẩu bạn vừa nhập không khớp với mật khẩu trước đó" });
    }
  
    const emailExist = await userModel.findOne({ email });
    if (emailExist) {
      return res.status(400).render('register', { err: "Email đã tồn tại, vui lòng thử email khác" });
    }

    const createUser = await userModel.create({ name, email, password: bcrypt.hashSync(password, 10) });
    if (createUser) {
      return res.status(200).render('register', { success: "Tạo tài khoản thành công" });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).render('register', { err: "Có lỗi xảy ra trong quá trình đăng ký, xin vui lòng thử lại sau" });
  }
}

module.exports = { register: register };
