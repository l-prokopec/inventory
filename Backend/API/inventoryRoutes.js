const express = require('express');
const router = express.Router();
const db = require('../db'); // Import database connection

router.get('/sausages', (req, res) => {
    db.all('SELECT * FROM sausages WHERE count > 0', [], (err, rows) => {
        if (err) {
            res.status(500).json({ message: 'Error while loading sausages' });
        } else {
            res.json(rows); // Returns all sausages with count > 0
        }
    });
});

// API endpoint for adding new sausage
router.post('/sausages', (req, res) => {
    const { name, count } = req.body;

    // Vložení nové klobásy do databáze
    db.run('INSERT INTO sausages (name, count) VALUES (?, ?)', [name, count], function (err) {
        if (err) {
            res.status(500).json({ message: 'Error adding sausage' });
        } else {
            res.status(201).json({
                id: this.lastID, // ID of the last added record
                name: name,
                count: count,
                message: 'Sausage added successfully.'
            });
        }
    });
});

// API endpoint for sausage count update 
router.post('/sausages/:id', (req, res) => {
    const id = req.params.id;
    const { countChange } = req.body; // Sending +1 or -1

    // Update sausage count
    db.run('UPDATE sausages SET count = count + ? WHERE id = ?', [countChange, id], function (err) {
        if (err) {
            res.status(500).json({ message: 'Error updating sausage count' });
        } else if (this.changes === 0) {
            res.status(404).json({ message: 'Sausage not found.' });
        } else {
            res.json({ message: 'Sausage count update successfull.' });
        }
    });
});

module.exports = router;
