// schema.js
const mongoose = require('mongoose');

const dashboardDataSchema = new mongoose.Schema({
  Intensity: String,
  Likelihood: String,
  Relevance: String,
  Year: String,
  Country: String,
  Topics: String,
  Region: String,
  City: String,
});

module.exports = mongoose.model('DashboardData', dashboardDataSchema);
