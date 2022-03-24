require("dotenv").config;

const express = require("express");
const booking = require("../models/booking");
const auth = require("../middleware/auth");
const { getUser, getBooking } = require("../middleware/finders");


const router = express.Router();

// GET all products
router.get("/", auth, async (req, res) => {
  try {
    const booking = await booking.find();
    res.status(201).send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }booking
});

// GET one product
router.get("/:id", [auth, getBooking], (req, res, next) => {
  res.send(res.booking);
});

// CREATE a product
router.post("/", auth, async (req, res, next) => {

  const { title, category,description, img, price } = req.body;

  let booking;

  img
    ? (booking = new booking({
        title,
        category,
        description,
        created_by: req.user._id,
        img,
        price
      }))
    : (booking = new booking({
      title,
      category,
      description,
      created_by: req.user._id,
      img,
      price
      }));

  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a product
router.patch("/:id", [auth, getBooking], async (req, res, next) => {
  if (req.user._id !== res.booking.created_by)
    res
      .status(400)
      .json({ message: "You do not have the permission to update this room" });
  const { title, category,description, img, price } = req.body;
  if (title) res.booking.title = title;
  if (category) res.booking.category = category;
  if (description) res.booking.description = description;
  if (price) res.booking.price = price;
  if (img) res.booking.img = img;

  try {
    const updatedBooking = await res.booking.save();
    res.status(201).send(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a product
router.delete("/:id", [auth, getBooking], async (req, res, next) => {
  if (req.user._id !== res.booking.created_by)
    res
      .status(400)
      .json({ message: "You do not have the permission to delete this room" });
  try {
    const booking = await booking.findById(req.booking._id)
    await booking.remove();
    res.json({ message: "Deleted product" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
