const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const axios = require('axios');
const userRoutes = require('./routes/userRoutes'); // User-related routes
const reminderRoutes = require('./routes/reminderRoutes'); // Reminder-related routes

const app = express();

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/reminders', reminderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Here you would also initialize the cron job for scheduled notifications
// ...

module.exports = app; // Exporting for modularization and potential testing
