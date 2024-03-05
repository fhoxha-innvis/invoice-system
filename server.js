const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = 5000; // Feel free to use any available port

app.use(cors());

app.get('/api/invoices', async (req, res) => {
  try {
    const response = await fetch('http://sad1.ivaelektronik.com:8081/api/Invoices');
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ message: 'Failed to fetch invoices' });
  }
});
app.get('/api/invoices/:invoiceId', async (req, res) => {
    try {
      // Accessing invoiceId from the route parameter
      const { invoiceId } = req.params;
      const response = await fetch(`http://sad1.ivaelektronik.com:8081/api/Invoices/${invoiceId}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching invoice details:', error);
      res.status(500).json({ message: 'Failed to fetch invoice details' });
    }
});

app.post('/api/postData', async (req, res) => {
    try {
      const response = await fetch('http://example.com/api/postData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add other headers as needed
        },
        body: JSON.stringify(req.body), // Make sure to send the body received from the React app
      });
  
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Failed to post data' });
    }
  });
  

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
