// Load express
const express = require('express');
const cors = require('cors');
const path = require('path');
const inventoryRoutes = require(path.resolve(__dirname, 'API', 'inventoryRoutes'));

// Create app
const app = express();

const port = 3001;

app.use(cors());

// Middleware for work with JSON in the request body
app.use(express.json());

// Add inventory router
app.use('/api', inventoryRoutes);

// Correct password
const correctPassword = 'chaticka';

app.post('/login', (req, res) => {
  const { password } = req.body;
  console.log('Přijaté heslo:', password);

  if (password === correctPassword) {
    res.status(200).json({ success: true, message: 'Přihlášení úspěšné' });
  } else {
    res.status(401).json({ success: false, message: 'Špatné heslo' });
  }
});


// Server test
app.get('/', (req, res) => {
  res.send('Backend je v provozu!');
});

// Server start
app.listen(port, () => {
  console.log(`Server běží na http://localhost:${port}`);
});
