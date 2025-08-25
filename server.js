const express = require('express');
const app = express();
const PORT = 3000;

// Serve static files from the public directory
app.use(express.static(__dirname + '/public'));

// Example private logic route
app.get('/api/message', (req, res) => {
  res.json({ message: 'This is a private message from the backend!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
