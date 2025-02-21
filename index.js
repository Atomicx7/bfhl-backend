const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// CORS Configuration
const corsOptions = {
  origin: 'https://bfhl-frontend-505.vercel.app', // Allow frontend requests
  methods: 'GET,POST,OPTIONS',
  allowedHeaders: 'Content-Type',
};

// Apply CORS Middleware
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Handle Preflight Requests (OPTIONS)
app.options('*', cors(corsOptions));

// POST endpoint
app.post('/bfhl', (req, res) => {
  try {
    const { data, user_id, email, roll_number } = req.body;

    // Validate input
    if (!data || !Array.isArray(data)) {
      throw new Error('Invalid data format');
    }

    // Process the data
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highest_alphabet = alphabets.length > 0 
      ? alphabets.reduce((max, curr) => curr.toUpperCase() > max ? curr.toUpperCase() : max) 
      : null;

    // Send response
    res.json({
      is_success: true,
      user_id: user_id || "default_user", // Avoid undefined values
      email: email || "default@example.com",
      roll_number: roll_number || "000000",
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highest_alphabet
    });

  } catch (error) {
    res.status(400).json({
      is_success: false,
      error: error.message
    });
  }
});

// GET endpoint for health check
app.get('/bfhl', (req, res) => {
  res.json({
    operation_code: 1
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
