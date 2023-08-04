const fs = require('fs');
const mongoose = require('mongoose');

// Replace the following connection string with your MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/dashboarddb';

// Path to the JSON file
const jsonFilePath = './jsondata.json';

// Import the DashboardData model from server.js
const { DashboardData } = require('./server');

async function pushDataFromFile() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Delete all existing documents in the collection
    await DashboardData.deleteMany({});

    // Read data from the JSON file
    const rawData = fs.readFileSync(jsonFilePath);
    const dataArray = JSON.parse(rawData);

    // Insert the array of JSON objects
    const result = await DashboardData.insertMany(dataArray);
    console.log(`${result.length} documents inserted.`);
  } catch (error) {
    console.error('Error: ', error);
  }
}

// Call the function to push data from the file
pushDataFromFile();
