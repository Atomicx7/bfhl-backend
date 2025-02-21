import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputJson, setInputJson] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [email, setEmail] = useState('punnyyashdeep@gmail.com');
  const [rollNumber, setRollNumber] = useState('2237505');
  const [userId] = useState('Yashdeep_singh_12052002');

  const options = ['Alphabets', 'Numbers', 'Highest Alphabet'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(inputJson);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error('Invalid JSON format');
      }

      // Fetch without 'no-cors' mode
      const res = await fetch('https://bfhl-frontend-505.vercel.app/bfhl', { // Replace with your backend URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          email: email,
          roll_number: rollNumber,
          data: parsedData.data
        }),
      });

      // Check if the response is successful
      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json(); // This will work if CORS is handled on the backend
      setResponse(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;

    let displayData = {
      email: response.email,
      roll_number: response.roll_number,
    };

    selectedOptions.forEach(option => {
      switch (option) {
        case 'Alphabets':
          displayData.alphabets = response.alphabets;
          break;
        case 'Numbers':
          displayData.numbers = response.numbers;
          break;
        case 'Highest Alphabet':
          displayData.highest_alphabet = response.highest_alphabet;
          break;
        default:
          break;
      }
    });

    return (
      <div>
        <h3>Filtered Response:</h3>
        <pre>{JSON.stringify(displayData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>2237505</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="College Email ID"
          required
        />
        <input
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="College Roll Number"
          required
        />
        <textarea
          value={inputJson}
          onChange={(e) => setInputJson(e.target.value)}
          placeholder='Enter JSON data e.g., { "data": ["M","1","334","4","B"] }'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <div className="error">{error}</div>}
      {response && (
        <div>
          <h3>Multi-Filter Section:</h3>
          <select
            multiple
            onChange={handleOptionChange}
            style={{ margin: '20px 0', width: '200px', height: '100px' }}
          >
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
