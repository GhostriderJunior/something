
<script src="js/script.js"></script>

document.addEventListener('DOMContentLoaded', function () {
    const notesContainer = document.getElementById('notesContainer');

    displayNotes();

    async function displayNotes() {
        notesContainer.innerHTML = '';

        try {
            // Fetch notes from the server
            const response = await axios.get('http://localhost:3000/notes');
            const notes = response.data;

            if (notes.length === 0) {
                notesContainer.innerHTML = '<p>No notes available.</p>';
            } else {
                notes.forEach(function (note) {
                    const noteElement = createNoteElement(note);
                    notesContainer.appendChild(noteElement);
                });
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }

    function createNoteElement(note) {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        const formattedTimestamp = new Date(note.timestamp).toLocaleString();
        noteElement.innerHTML = `<strong>${note.name}:</strong> ${note.message} <small>${formattedTimestamp}</small>`;
        return noteElement;
    }

    async function addNote() {
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;

        try {
            // Send the new note to the server
            await axios.post('http://localhost:3000/notes', { name, message });

            // After adding the note, fetch and display all notes
            displayNotes();

            // Clear the form
            clearForm();
        } catch (error) {
            console.error('Error adding note:', error);
        }
    }

    function clearForm() {
        document.getElementById('name').value = '';
        document.getElementById('message').value = '';
    }

    document.getElementById('addNoteForm').addEventListener('submit', function (event) {
        event.preventDefault();
        addNote();
    });
});
