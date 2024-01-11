const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Array to store notes (for simplicity; in production, use a database)
const notes = [];

// Endpoint to get all notes
app.get('/notes', (req, res) => {
    res.json(notes);
});

// Endpoint to add a new note
app.post('/notes', (req, res) => {
    const { name, message } = req.body;
    const newNote = { name, message };
    notes.push(newNote);
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
