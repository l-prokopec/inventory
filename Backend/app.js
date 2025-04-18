// 1. Načtení Expressu
const express = require('express');

// 2. Vytvoření aplikace
const app = express();

// 3. Port, na kterém bude server běžet
const port = 3001;

// 4. Middleware pro práci s JSONem v těle požadavku
app.use(express.json());

// Simulace "správného" hesla
const correctPassword = 'chaticka';

app.post('/login', (req, res) => {
  const { password } = req.body;

  if (password === correctPassword) {
    res.status(200).json({ success: true, message: 'Přihlášení úspěšné' });
  } else {
    res.status(401).json({ success: false, message: 'Špatné heslo' });
  }
});


// 5. Testovací endpoint – základní kontrola, že server funguje
app.get('/', (req, res) => {
  res.send('Backend je v provozu!');
});

// 6. Spuštění serveru
app.listen(port, () => {
  console.log(`Server běží na http://localhost:${port}`);
});
