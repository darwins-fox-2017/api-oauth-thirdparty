module.exports = function (req, res, next) {
    let crypto = require('crypto');
    let mongoose = require('mongoose');
    // mongoose.connect('mongodb://localhost/AOuth');

    let salt = "";
    let hashPassword = "";
    // generate random namber untuk diisi ke variabel salt
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 5; i++) {
        salt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    // hash hasil generate salt dengan password yang di inputkan
    // lalu simpan hasil nya ke variabel hash
    hashPassword = crypto.createHmac('sha256', salt)
        .update(req.body.hashPassword)
        .digest('hex');

    req.hash = {}
    req.hash.salt = salt
    req.hash.hashPassword = hashPassword
    next()
}
