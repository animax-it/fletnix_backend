const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getUser = require("../middleware/getUser");
require("dotenv").config();

const { body, validationResult } = require("express-validator");

router.post(
  '/signup',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { email, password, age } = req.body;

      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ success: false, error: 'Sorry, user already exists' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({
        email,
        password: hashedPassword,
        age,
      });

      await newUser.save();

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

      res.json({ success: true, authToken: token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'An error occurred while creating a new user' });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "can not be blank").exists(),
  ],
  async (req, res) => {
    let = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please login with your credential" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please enter with your credential" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(payload, process.env.JWT_SECRET);
      success = true;
      res.json({
        success,
        token: authToken,
        emailId: user.email,
        age: user.age,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server occur");
    }
  }
);


module.exports = router;
