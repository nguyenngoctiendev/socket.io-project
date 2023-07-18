const userModel = require('../model/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
//register new user
//post /api/register

async function register(req, res) {
try {
    const {name, email, password} = req.body;
    console.log(name)
if (!name || !email || !password) {
    return res.status(400).send("Vui lòng nhập thông tin để đăng ký tài khoản")
}
const emailExist = await userModel.findOne({email});
if (emailExist) {
return res.status(400).send("Email đã tồn tại, vui lòng thử email khác")    
}
const createUser = await userModel.create({ name, email, password: bcrypt.hashSync(password, 10)});
if (createUser) {
    return res.status(200).json({
        _id: createUser._id,
         name: createUser.name,
          email: createUser.email,
admin: createUser.admin,
    })
}
}
catch(err) {
    console.error(err.message);
        return res.status(500).send("Có lỗi xảy ra trong quá trình đăng ký, xin vui lòng thử lại sau");

}   
    
}


module.exports = {register: register};