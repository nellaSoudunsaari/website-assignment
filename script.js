//Navigation
const navFrontpg = document.getElementById("front-page");
const navFirstpg = document.getElementById("first-page");
const navSecondpg = document.getElementById("second-page");
const navThirdpg = document.getElementById("third-page");
const navFourthpg = document.getElementById("fourth-page");

//Pages
const conFrontpg = document.getElementById("fp-content");
const conFirstpg = document.getElementById("1p-content");
const conSecondpg = document.getElementById("2p-content");
const conThirdpg = document.getElementById("3p-content");
const conFourthpg = document.getElementById("4p-content");

//Elements
const pgtitle = document.getElementById("title");
    // notes
const noteTitle = document.getElementById("note-title");
const noteText = document.getElementById("note-text");
const addNote = document.getElementById("add-note");
const clearNote = document.getElementById("clear-note");
const notesList = document.getElementById("notes-list");
const errMsg = document.getElementById("errMsg");


// Change pages/navigation
navFrontpg.addEventListener("click", () =>{
    pgtitle.innerHTML = "Front page";
    conFrontpg.style.display = "block";
    conFirstpg.style.display = "none";
    conSecondpg.style.display = "none";
    conThirdpg.style.display = "none";
    conFourthpg.style.display = "none";
});

navFirstpg.addEventListener("click", () =>{
    pgtitle.innerHTML = "Write a letter!";
    conFrontpg.style.display = "none";
    conFirstpg.style.display = "block";
    conSecondpg.style.display = "none";
    conThirdpg.style.display = "none";
    conFourthpg.style.display = "none";
});

navSecondpg.addEventListener("click", () =>{
    pgtitle.innerHTML = "Second page";
    conFrontpg.style.display = "none";
    conFirstpg.style.display = "none";
    conSecondpg.style.display = "block";
    conThirdpg.style.display = "none";
    conFourthpg.style.display = "none";
});

navThirdpg.addEventListener("click", () =>{
    pgtitle.innerHTML = "Third page";
    conFrontpg.style.display = "none";
    conFirstpg.style.display = "none";
    conSecondpg.style.display = "none";
    conThirdpg.style.display = "block";
    conFourthpg.style.display = "none";
});

navFourthpg.addEventListener("click", () =>{
    pgtitle.innerHTML = "Fourth page";
    conFrontpg.style.display = "none";
    conFirstpg.style.display = "none";
    conSecondpg.style.display = "none";
    conThirdpg.style.display = "none";
    conFourthpg.style.display = "block";
});

// Notes page logic

showNotes();

addNote.addEventListener("click", () =>{
    let notes = localStorage.getItem("notes");
    if(notes === null){
        notes = [];
    } else{
        notes = JSON.parse(notes);
    }

    if(noteText.value == ""){
        errMsg.innerHTML = "Please, write a note first";
        return;
    }

    const noteObj = { title: noteTitle.value, text: noteText.value}

    noteTitle.value = "";
    noteText.value = "";
    errMsg.innerHTML = "";
    notes.push(noteObj);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
});

clearNote.addEventListener("click", () =>{
    noteTitle.value = "";
    noteText.value = "";
    errMsg.innerHTML = "";
});

function showNotes(){
    let notesHTML = "";
    let notes = localStorage.getItem("notes");

    if(notes === null){
        return;
    } else {
        notes = JSON.parse(notes);
    }

    for(let i = 0; i < notes.length; i++){
        notesHTML += `<div class="note">
                            <button class="delete-note" id=${i} onclick="deleteNote(${i})">Delete note</button>
                            <button class="show-note" id=${i} onClick="showFullNote(${i})">Show full note</button>
                            <br>
                            <span class="note-title"><strong>${notes[i].title === "" ? 'Note' : notes[i].title}</strong></span>
                            <div class="note-text">${notes[i].text}</div>
                        </div>`;
    }

    notesList.innerHTML = notesHTML;
}

function deleteNote(ind){
    let notes = localStorage.getItem("notes");
    if(notes === null){
        return;
    } else {
        notes = JSON.parse(notes);
    }

    notes.splice(ind, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function showFullNote(ind){
    let notes = localStorage.getItem("notes");

    if(notes === null){
        return;
    } else {
        notes = JSON.parse(notes);
    }

    noteTitle.value = notes[ind].title;
    noteText.value = notes[ind].text;
}