document.addEventListener('DOMContentLoaded', function () {
    const notesContainer = document.getElementById('notesContainer');

    // Function to fetch and display notes
    async function displayNotes() {
        notesContainer.innerHTML = '';

        try {
            const response = await fetch('https://ghostriderjunior.xyz/notes');
            const notes = await response.json();

            if (notes.length === 0) {
                notesContainer.innerHTML = '<p>No reviews available.</p>';
            } else {
                notes.forEach(function (note) {
                    const noteElement = createNoteElement(note);
                    notesContainer.appendChild(noteElement);
                });
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    }

    // Function to create a note element
    function createNoteElement(note) {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerHTML = `<strong>${note.name}:</strong> ${note.message}`;
        return noteElement;
    }

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
            console.error('Error fetching reviews:', error);
            
            const errorMessageElement = document.createElement('div');
            errorMessageElement.className = 'error-message';
            errorMessageElement.textContent = 'Error fetching reviews: ' + error.message;
            document.body.appendChild(errorMessageElement);
        }
    }

    // Call the displayNotes function when the page loads
    displayNotes();
});
