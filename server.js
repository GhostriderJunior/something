const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const notes = []; // You can replace this with your data store

// Handle POST requests to add a note
app.post('/api/addnote', (req, res) => {
    const { name, message } = req.body;

    // Add the note to your data store
    const newNote = { name, message };
    notes.push(newNote);

    // Send a response
    res.json({ success: true, message: 'Note added successfully' });
});

// Add other routes as needed

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
