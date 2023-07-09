const express = require("express");
const getUser = require("../middleware/getUser");
const router = express.Router();
const Movies = require("../models/Movies");
const { body, validationResult } = require("express-validator");

// Routes1: get all the movies
router.get("/allshows", async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const pageSize = parseInt(req.query.pageSize) || 15; 
  const age = parseInt(req.query.age) || 17; 
  const type = req.query.type || "";
  const search = req.query.search || ""; 

  const skip = (page - 1) * pageSize;

  const filter = {
    ...(age < 18 ? { rating: { $ne: "R" } } : {}),
    type: type === "TV Show" ? "TV Show" : "Movie",
    $or: [
      { title: { $regex: search, $options: "i" } }, // 
      { cast: { $regex: search, $options: "i" } }, 
    ],
  };

  Movies.find(filter)
    .skip(skip)
    .limit(pageSize)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error("Failed to get data from MongoDB:", err);
      res.status(500).json({ error: "Failed to get data" });
    });
});

module.exports = router;
