const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.curso = require("./curso.model");
db.categoria = require("./categoria.model");
db.cupon = require("./cupon.model");
db.checkout = require("./checkout.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;