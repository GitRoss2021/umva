// This is used to find various Schemas
const User = require("../models/user");
const Product = require("../models/booking");

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);

    if (!user) res.status(404).json({ message: "Could not find user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

async function getBooking(req, res, next) {
  let booking;
  try {
    booking = await Booking.findById(req.params.id);
    if (!booking) res.status(404).json({ message: "Could not find product" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.booking = booking;
  next();
}

module.exports = { getUser, getBooking };
