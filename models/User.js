

const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
 
});

const User = mongoose.model('User', sampleSchema, 'user');

module.exports = User;
