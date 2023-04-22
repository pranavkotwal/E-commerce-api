// config.js
// mongodb+srv://duser:VwjqB54S4RoQvQDw@cluster1.kfwq5so.mongodb.net/test
const db = require('mongoose');

// Connect to MongoDB
db.connect('mongodb+srv://duser:VwjqB54S4RoQvQDw@cluster1.kfwq5so.mongodb.net/test', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Export the Mongoose instance
module.exports = db;
