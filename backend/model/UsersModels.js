const mongoose = require("mongoose");

const UsersSchema = require("../schemas/UsersSchema.js");

const UsersModel = mongoose.model("users", UsersSchema);

module.exports = UsersModel;
