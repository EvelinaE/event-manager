// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

// Create Express app
const app = express();

// Middleware to parse request bodies as JSON
app.use(bodyParser.json());

// Enable CORS for all requests
app.use(cors());

// Define POST endpoint for form submission
app.post('/api/submit-form', (req, res) => {
  // Handle form submission here
  const formData = req.body;
  console.log('Form Data:', formData);
  res.status(200).json({ message: 'Form submitted successfully!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
