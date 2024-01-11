const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Endpoint for adding notes
app.post('/api/notes', (req, res) => {
    // Extract data from the request body
    const { name, message } = req.body;

    // Process the data (e.g., save it to a database)
    // ...

    // Send a response (e.g., success or error)
    res.status(200).json({ message: 'Note added successfully' });
});

// Start the server
const port = 3000; // Change this to the port you want to use
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
