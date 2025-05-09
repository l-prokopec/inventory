const sqlite3 = require('sqlite3').verbose();
const { error } = require('console');
const path = require('path');

// Create path to databse relative to the backend folder
const dbPath = path.join(__dirname, 'Database', 'inventory.db');

// Connect to the database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error while connecting to the database.', err.message);
    }
    else {
        console.log('Successfully connected to the database.');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS sausages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        count INTEGER NOT NULL DEFAULT 0
    )`)
});

// Export database connection, so it can be used by app.js
module.exports = db;