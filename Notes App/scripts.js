const d = document,
    $newNoteTitle = d.querySelector(".add-new-note-panel h3"),
    $newNoteContainer = d.querySelector(".add-new-note-container"),
    $newNotePanel = d.querySelector(".add-new-note-panel"),
    $newNotePanelTitle = d.getElementById("new-note-title"),
    $newNotePanelDescription = d.getElementById("new-note-description"),
    $submitNewNote = d.getElementById("send-new-note"),
    $cardsContainer = d.querySelector(".cards");

let editing = {
    edit: false,
    id: -1
},
    cardContent = [];

const renderNotes = () => {
    let notesCards = "";
    if (localStorage.getItem("notes")) {
        cardContent = JSON.parse(localStorage.getItem("notes"));
        cardContent.forEach(note => {
            notesCards += `
                <div class="card new-note">
                    <div class="content">
                        <h3>${note.title}</h3>
                        <p>${note.description}</p>    
                    </div>
                    <div class="footer">
                        <p class="date">${note.date}</p>
                        <div class="menu">
                            <img src="more_horiz.png" onclick="displayMenu(this)">
                            <ul id="${cardContent.indexOf(note)}">
                                <li class="edit">
                                    <img src="edit.png">
                                    <p>Edit</p>
                                    <div class="menu-li-clicker"></div>
                                </li>
                                <li class="delete">
                                    <img src="delete.png">
                                    <p>Delete</p>
                                    <div class="menu-li-clicker"></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        });
        $cardsContainer.innerHTML += notesCards;
    }
};

const addOrUpdateNote = () => {
    let newTitle = $newNotePanelTitle.value,
        newDescription = $newNotePanelDescription.value,
        noteDate = getNoteDate();

    if (editing.edit === false)  {
        cardContent.push(
            {
                title: newTitle,
                description: newDescription,
                date: noteDate
            }
        );
    } else {
        cardContent[editing.id].title = newTitle;
        cardContent[editing.id].description = newDescription;
        cardContent[editing.id].date = noteDate;
        editing.edit = false;
        editing.id = -1;
        $newNotePanelTitle.value = "";
        $newNotePanelDescription.value = "";
    }

    localStorage.setItem("notes", JSON.stringify(cardContent));
    renderNotes();
};

const updateNoteInterfaceChanges = (noteId) => {
    $newNoteTitle.textContent = "Update note";
    $newNoteContainer.classList.add("editing");
    $newNoteContainer.classList.add("active");
    $submitNewNote.value = "Update Note"
    $newNotePanel.classList.add("active");
    editing.edit = true;
    editing.id = noteId;
    $newNotePanelTitle.value = cardContent[noteId].title;
    $newNotePanelDescription.value = cardContent[noteId].description;  
};

const closePanelInterfaceChanges = () => {
    $newNoteContainer.classList.remove("active");
    $newNotePanel.classList.remove("active");
    if ($newNoteContainer.classList.contains("editing")) {
        $newNoteContainer.classList.remove("editing");
        $newNoteTitle.textContent = "Add a new note";
        $submitNewNote.value = "Add Note"
        editing.edit = false;
        editing.id = -1;
        $newNotePanelTitle.value = "";
        $newNotePanelDescription.value = "";
    };
};

const displayMenu = (cntxt) => {
    let $menu = cntxt.parentElement.lastElementChild;
    $menu.classList.add("active");
    d.addEventListener("click", e => {
        if (e.target !== cntxt) $menu.classList.remove("active");
    });
};

const deleteNote = (noteId) => {
    console.log(noteId)
    if (confirm("¿Realmente desea eliminar esta nota?")) {
        cardContent.splice(noteId, 1);
        console.log(cardContent)
        localStorage.setItem("notes", JSON.stringify(cardContent));
        location.reload();
    };
};

const getNoteDate = () => {
    let date = new Date(),
        noteDate = date.toLocaleDateString();
    return noteDate;
};

d.addEventListener("click", e => {
    if (e.target.matches(".add-btn") || e.target.matches(".add-btn p")) {
        $newNoteContainer.classList.add("active");
        $newNotePanel.classList.add("active");
    } else if (e.target.matches(".menu-li-clicker")) {
        let noteId = e.target.parentElement.parentElement.id;
        if (e.target.parentElement.matches(".edit")) {
            updateNoteInterfaceChanges(noteId);
        } else if (e.target.parentElement.matches(".delete")) {
            deleteNote(noteId);
        }
    } else if (e.target.matches(".add-new-note-panel img")) {
        closePanelInterfaceChanges();
    }
});

d.addEventListener("submit", e => {
    if (e.target.matches(".note-form")) {
        addOrUpdateNote();
    };
});

d.addEventListener("DOMContentLoaded", renderNotes);