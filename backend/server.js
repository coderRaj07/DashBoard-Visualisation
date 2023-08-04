// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const DashboardData = require('./schema');
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dashboarddb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/api/data', async (req, res) => {
  try {
    const filters = req.query; // Get the query parameters from the request

    // Build the query based on the filters
    const query = {};
    if (filters.end_year) query.end_year = filters.end_year;
    if (filters.topic) query.topic = filters.topic;
    if (filters.sector) query.sector = filters.sector;
    if (filters.region) query.region = filters.region;
    if (filters.pestle) query.pestle = filters.pestle;
    if (filters.source) query.source = filters.source;
    if (filters.swot) query.swot = filters.swot;
    if (filters.country) query.country = filters.country;
    if (filters.city) query.city = filters.city;

    // Fetch data from MongoDB based on the filters
    const data = await DashboardData.find(query);

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app; // Export the app for use in model.js

