
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id:{
    type: String
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: Number,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  join_date: {
    type: Date,
    required: false,
    default: Date.now,
  },
  cart: {
    type: Array,
    required: false,
    default: []
  },
});

module.exports = mongoose.model("User", userSchema);
