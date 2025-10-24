//NAVIGATION

// nav buttons
const navFrontpg = document.getElementById("front-page");
const navFirstpg = document.getElementById("first-page");
const navSecondpg = document.getElementById("second-page");
const navThirdpg = document.getElementById("third-page");
const navFourthpg = document.getElementById("fourth-page");

// Pages
const conFrontpg = document.getElementById("fp-content");
const conFirstpg = document.getElementById("1p-content");
const conSecondpg = document.getElementById("2p-content");
const conThirdpg = document.getElementById("3p-content");
const conFourthpg = document.getElementById("4p-content");

// Elements
const pgtitle = document.getElementById("title");



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
    pgtitle.innerHTML = "Notes";
    conFrontpg.style.display = "none";
    conFirstpg.style.display = "block";
    conSecondpg.style.display = "none";
    conThirdpg.style.display = "none";
    conFourthpg.style.display = "none";
});

navSecondpg.addEventListener("click", () =>{
    pgtitle.innerHTML = "Pokédex";
    conFrontpg.style.display = "none";
    conFirstpg.style.display = "none";
    conSecondpg.style.display = "block";
    conThirdpg.style.display = "none";
    conFourthpg.style.display = "none";
});

navThirdpg.addEventListener("click", () =>{
    pgtitle.innerHTML = "Pokémon type chart";
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



// NOTES


// Elements
const noteTitle = document.getElementById("note-title");
const noteText = document.getElementById("note-text");
const notesList = document.getElementById("notes-list");
const errMsg = document.getElementById("errMsg");

// Buttons
const addNote = document.getElementById("add-note");
const clearNote = document.getElementById("clear-note");


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

// POKÉDEX

// Elements
    // search 
const searchField = document.getElementById("search-field");
const searchBtn = document.getElementById("search-btn");

    //info fields
const pokemonID = document.getElementById("pokemon-id");
const pokemonName = document.getElementById("pokemon-name");
const pokemonType = document.getElementById("pokemon-types");
const pokedexEntry = document.getElementById("pokedex-entry");
const heightWeight = document.getElementById("pokemon-height-weight");
const defImg = document.getElementById("default-artwork");
const shinyImg = document.getElementById("shiny-artwork");
const shinyToggle = document.querySelector("#shiny");

searchBtn.addEventListener("click", () =>{
    const searchName = searchField.value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchName}`)
    .then(response => response.json())
    .then(data => displayPokemon(data))
    .catch(err => console.error(err));
});

function displayPokemon(pokemonData){

    //pokemon id is needed to fetch data from pokemon-species
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}`)
    .then(response => response.json())
    .then(data => {
        let languageNumber = 2;
        // language number changes between game versions
        for (let i = 0; i < data.flavor_text_entries.length; i++) {
            if (data.flavor_text_entries[i].language.name == "en") {
            languageNumber = i;
            break;
            }
        }
        quote = data.flavor_text_entries[languageNumber].flavor_text;
        pokedexEntry.innerHTML = quote;
    });

    // set both shiny and default sprites in advance
    let imgURL = pokemonData['sprites']['front_default'];
    let shinyImgURL = pokemonData['sprites']['front_shiny'];
    defImg.setAttribute("src", imgURL);
    shinyImg.setAttribute("src", shinyImgURL);

    pokemonID.innerHTML = `No. ${pokemonData.id}  &emsp;  ${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}`;

    // math.round because otherwise too many decimals
    const weight = Math.round((pokemonData.weight * 0.1) * 100) / 100;
    const height = Math.round((pokemonData.height * 0.1) * 100) / 100;
    heightWeight.innerHTML = `Height: ${height} m Weight: ${weight} kg`;

    // empty types before adding new ones
    pokemonType.innerHTML = "";
    pokemonData.types.forEach( type =>{
        pokemonType.innerHTML += `<img src="resources/pokemon_types/${type.type.name}.png" alt="">`;
    });
}

shinyToggle.addEventListener("change", function() {
    if(shinyToggle.checked){
        console.log("checked");
        shinyImg.style.display = "block";
        defImg.style.display = "none";
    } else {
        console.log("unchecked");
        shinyImg.style.display = "none";
        defImg.style.display = "block";
    }
});


// POKÉMON TYPE CHART


