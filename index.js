import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

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
      user_id: user_id,
      email: email,
      roll_number: roll_number,
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
