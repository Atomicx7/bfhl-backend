const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Enhanced CORS configuration
const corsOptions = {
  origin: 'https://bfhl-frontend-505.vercel.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// POST endpoint
app.post('/bfhl', (req, res) => {
  try {
    const { data, user_id, email, roll_number } = req.body;

    // Validate input
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: 'Invalid data format: Expected array in "data" field'
      });
    }

    // Process data
    const numbers = data.filter(item => !isNaN(item) && item.toString().trim() !== '');
    const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));
    
    // Find highest alphabet
    const highest_alphabet = alphabets.length > 0 
      ? [alphabets.reduce((max, curr) => 
          curr.localeCompare(max, 'en', {sensitivity: 'base'}) > 0 ? curr : max
        )] 
      : [];

    res.json({
      is_success: true,
      user_id,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_alphabet
    });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({
      is_success: false,
      error: 'Internal server error'
    });
  }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
