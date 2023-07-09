// src/models/Show.js

const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
  show_id: { type: Number, required: true, unique: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  director: String,
  cast: String,
  country: String,
  date_added: Date,
  release_year: Number,
  rating: String,
  duration: String,
  listed_in: String,
  description: String,
});

const Sample = mongoose.model('Sample', sampleSchema, 'sample');

module.exports = Sample;
