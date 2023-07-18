const userModel = require("../model/userModel");

const searchAllUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await userModel.find({ ...keyword, name: { $ne: req.user && req.user.name } }, { password: 0, _id: 0, createdAt: 0, updatedAt: 0, __v: 0}, );
  res.send(users);
};

module.exports = searchAllUsers;
