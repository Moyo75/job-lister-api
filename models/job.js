const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  stack: { type: String, required: true },
  pay: { type: Number, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  createdAt: { type: String, required: true, default: new Date().toISOString() }
});

module.exports = mongoose.model('Job', jobSchema);
