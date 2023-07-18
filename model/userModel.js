const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
name: {type: String, required: true},
email: {type: String, unique: true, required: true},
password: {type: String, required: true },
admin: {type: Boolean, required: true, default: true}    
}, { timestamps: true});

const userModel = mongoose.model("userInfo", userSchema);

module.exports = userModel;