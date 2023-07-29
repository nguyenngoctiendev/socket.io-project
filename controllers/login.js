const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).render("login", { err: "Xin vui lòng nhập đầy đủ thông tin" });
  }

  try {
    const findEmail = await userModel.findOne({ email });

    if (findEmail) {
      const matchPassword = await bcrypt.compare(password, findEmail.password);

      if (matchPassword) {
        const accessToken = jwt.sign({ _id: findEmail._id }, process.env.jwt, {
          expiresIn: "30d",
        });

        // Đăng nhập thành công, lưu token vào session của người dùng
        req.session.accessToken = accessToken;

        // Chuyển hướng đến trang chủ
        return res.redirect("/");
      } else {
        // Sai mật khẩu
        return res.status(400).render("login", { err: "Mật khẩu không chính xác" });
      }
    } else {
      // Không tìm thấy email trong cơ sở dữ liệu
      return res.status(404).render("login", { err: "Email không tồn tại" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).render("login", { err: "Có lỗi xảy ra, xin vui lòng thử lại sau" });
  }
};

module.exports = { userLogin };
