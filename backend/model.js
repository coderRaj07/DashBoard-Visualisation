// model.js
const express = require('express');
const DashboardData = require('./schema');

const app = require('./server');

// API to get data from MongoDB
app.get('/api/data', async (req, res) => {
  try {
    const data = await DashboardData.find({});
    res.json(data);
    console.log(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
