const mongoose = require("mongoose");
async function dbConnect() {
    try {
const con = await mongoose.connect(`mongodb://127.0.0.1:27017/tiendata`, {
useNewUrlParser: true, useUnifiedTopology: true});
console.log("db Connected")        
    }
    catch(err) {
        console.error(err.message)
    }
}
module.exports = {dbConnect: dbConnect};