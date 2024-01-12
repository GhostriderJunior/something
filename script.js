// JavaScript (js/script.js)
document.addEventListener('DOMContentLoaded', function () {
    const notesContainer = document.getElementById('notesContainer');

    // Function to fetch and display notes
    async function displayNotes() {
        notesContainer.innerHTML = '';

        try {
            const response = await fetch('https://ghostriderjunior.xyz/notes');
            const notes = await response.json();

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

    // Function to create a note element
    function createNoteElement(note) {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerHTML = `<strong>${note.name}:</strong> ${note.message}`;
        return noteElement;
    }

    // Function to add a note
    async function addNote() {
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;

        try {
            await fetch('https://ghostriderjunior.xyz/api/addnote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, message }),
            });

            // After adding the note, fetch and display all notes
            displayNotes();

            // Clear the form
            clearForm();
        } catch (error) {
            console.error('Error adding note:', error);
        }
    }

    // Function to clear the form
    function clearForm() {
        document.getElementById('name').value = '';
        document.getElementById('message').value = '';
    }

    // Event listener for form submission
    document.getElementById('addNoteForm').addEventListener('submit', function (event) {
        event.preventDefault();
        addNote();
    });

    // Initial display of notes
    displayNotes();
});

// Add Note HTML Page (add_note.html)
async function addNote() {
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    try {
        await fetch('https://ghostriderjunior.xyz/api/addnote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, message }),
        });

        // Redirect to the notes tab after adding a note
        window.location.href = 'https://ghostriderjunior.xyz/notes';
    } catch (error) {
        console.error('Error adding note:', error);

        const errorMessageElement = document.createElement('div');
        errorMessageElement.className = 'error-message';
        errorMessageElement.textContent = 'Error adding note. Please try again later.';
        document.body.appendChild(errorMessageElement);
    }
}
