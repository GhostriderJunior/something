const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Store notes in-memory for simplicity (in a real app, you'd use a database)
const notes = [];

// Endpoint to get all notes
app.get('/notes', (req, res) => {
    res.json(notes);
});

// Endpoint to add a new note
app.post('/notes', (req, res) => {
    const { name, message } = req.body;
    const newNote = { name, message, timestamp: new Date() };
    notes.push(newNote);
    res.status(201).json(newNote);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
