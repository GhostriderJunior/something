
<script src="js/script.js"></script>

document.addEventListener('DOMContentLoaded', function () {
    const notesContainer = document.getElementById('notesContainer');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    displayNotes();

    function displayNotes() {
        notesContainer.innerHTML = '';

        if (notes.length === 0) {
            notesContainer.innerHTML = '<p>No notes available.</p>';
        } else {
            notes.forEach(function (note) {
                const noteElement = createNoteElement(note);
                notesContainer.appendChild(noteElement);
            });
        }
    }

    function createNoteElement(note) {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerHTML = note;
        return noteElement;
    }

    function addNote() {
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;

        const note = `<div>${name}: ${message}</div>`;
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));

        displayNotes();
        clearForm();
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
