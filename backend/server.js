// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

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

// Define MongoDB schema and model (assuming the data structure)
const dashboardDataSchema = new mongoose.Schema({
  Intensity: String,
  Likelihood: String,
  Relevance: String,
  Year: String,
  Country: String,
  Topics: String,
  Region: String,
  City: String,
  // Other fields from the JSON data
});

const DashboardData = mongoose.model('DashboardData', dashboardDataSchema);

// API to get data from MongoDB
app.get('/api/data', (req, res) => {
  DashboardData.find({}, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = { DashboardData }; // Export the model for use in pushData.js
