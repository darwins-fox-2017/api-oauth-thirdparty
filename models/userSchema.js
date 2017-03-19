let mongoose = require("mongoose");

let user = mongoose.Schema({
    userName: String,
    hashPassword: String,
    salt: String,
    dataId: Number
})

let User = mongoose.model('user', user)
module.exports = User;
