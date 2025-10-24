//NAVIGATION

// nav buttons
const navFrontpg = document.getElementById("front-page");
const navFirstpg = document.getElementById("first-page");
const navSecondpg = document.getElementById("second-page");
const navThirdpg = document.getElementById("third-page");

// Pages
const conFrontpg = document.getElementById("fp-content");
const conFirstpg = document.getElementById("1p-content");
const conSecondpg = document.getElementById("2p-content");
const conThirdpg = document.getElementById("3p-content");

// Elements
const pgtitle = document.getElementById("title");



// Change pages/navigation
navFrontpg.addEventListener("click", () =>{
    pgtitle.innerHTML = "Front page";
    conFrontpg.style.display = "grid";
    conFirstpg.style.display = "none";
    conSecondpg.style.display = "none";
    conThirdpg.style.display = "none";
});

navFirstpg.addEventListener("click", () =>{
    pgtitle.innerHTML = "Notes";
    conFrontpg.style.display = "none";
    conFirstpg.style.display = "grid";
    conSecondpg.style.display = "none";
    conThirdpg.style.display = "none";
});

navSecondpg.addEventListener("click", () =>{
    pgtitle.innerHTML = "Pokédex";
    conFrontpg.style.display = "none";
    conFirstpg.style.display = "none";
    conSecondpg.style.display = "grid";
    conThirdpg.style.display = "none";
});

navThirdpg.addEventListener("click", () =>{
    pgtitle.innerHTML = "Pokémon type chart";
    conFrontpg.style.display = "none";
    conFirstpg.style.display = "none";
    conSecondpg.style.display = "none";
    conThirdpg.style.display = "grid";
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

// show stored notes on site load
showNotes();


// add note to local storage
addNote.addEventListener("click", () =>{

    // create a notes-array to local storage 
    // IF not already created, then get the notes-array
    let notes = localStorage.getItem("notes");
    if(notes === null){
        notes = [];
    } else{
        notes = JSON.parse(notes);
    }

    // check if note has any text
    if(noteText.value == ""){
        errMsg.innerHTML = "Please, write a note first";
        return;
    }

    // save information to an object
    const noteObj = { title: noteTitle.value, text: noteText.value}

    // clear all text on create
    noteTitle.value = "";
    noteText.value = "";
    errMsg.innerHTML = "";
    // push note to array and save it to local storage
    notes.push(noteObj);
    localStorage.setItem("notes", JSON.stringify(notes));
    // update all notes list
    showNotes();
});

// Clear all text
clearNote.addEventListener("click", () =>{
    noteTitle.value = "";
    noteText.value = "";
    errMsg.innerHTML = "";
});

function showNotes(){

    // create a notes-array to local storage 
    // IF not already created, then get the notes-array
    let notesHTML = "";
    let notes = localStorage.getItem("notes");

    if(notes === null){
        return;
    } else {
        notes = JSON.parse(notes);
    }

    // create a single note element with functions
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

// delete a single note
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

// show a single note and it's information
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
const randomBtn = document.getElementById("random-btn");

    //info fields
const pokemonID = document.getElementById("pokemon-id");
const pokemonName = document.getElementById("pokemon-name");
const pokemonType = document.getElementById("pokemon-types");
const pokedexEntry = document.getElementById("pokedex-entry");
const heightWeight = document.getElementById("pokemon-height-weight");
const defImg = document.getElementById("default-artwork");
const shinyImg = document.getElementById("shiny-artwork");
const shinyToggle = document.querySelector("#shiny");


// Search for a pokemon
searchBtn.addEventListener("click", () =>{
    // change search term to lowercare to avoid errors
    const searchName = searchField.value.toLowerCase();
    // fetch the pokemon and display it
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchName}`)
    .then(response => response.json())
    .then(data => displayPokemon(data))
    .catch(err => console.error(err));
});

// Get a random pokemon
randomBtn.addEventListener("click", () =>{

    // variable for pokemon id
    let randomPokemonID;

    // get all pokemon
    fetch(`https://pokeapi.co/api/v2/pokemon/`)
    .then(response => response.json())
    .then(data => {
        // count the occurrences
        let allPokemonCount = data.count;
        // set a random pokemon id
        randomPokemonID = Math.floor(Math.random() * (allPokemonCount - 1));
        // fetch the random pokemon by it's id and display it
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonID}`)
        .then(response => response.json())
        .then(data => {
            displayPokemon(data);
        });
  })});


// Display the fetched pokemon
function displayPokemon(pokemonData){

    // fetch the flavour text/pokedex entry
    //pokemon id is needed to fetch data from pokemon-species
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}`)
    .then(response => response.json())
    .then(data => {
        let languageNumber = 2;
        // language number changes between game versions, make sure it's in english
        for (let i = 0; i < data.flavor_text_entries.length; i++) {
            if (data.flavor_text_entries[i].language.name == "en") {
            languageNumber = i;
            break;
            }
        }
        quote = data.flavor_text_entries[languageNumber].flavor_text;
        pokedexEntry.innerHTML = quote;
    });

    // set both shiny and default sprites in advance, changing them happens in the shinyToggle-eventListener
    let imgURL = pokemonData['sprites']['front_default'];
    let shinyImgURL = pokemonData['sprites']['front_shiny'];
    defImg.setAttribute("src", imgURL);
    shinyImg.setAttribute("src", shinyImgURL);

    // Set pokemon id and name
    pokemonID.innerHTML = `No. ${pokemonData.id}  &emsp;  ${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}`;

    // math.round because otherwise too many decimals
    const weight = Math.round((pokemonData.weight * 0.1) * 100) / 100;
    const height = Math.round((pokemonData.height * 0.1) * 100) / 100;
    // set height and weight (in the metric system)
    heightWeight.innerHTML = `Height: ${height} m Weight: ${weight} kg`;

    // empty types before adding new ones
    pokemonType.innerHTML = "";
    // get each type from a single pokemon, and create an image for each of them (or only one)
    pokemonData.types.forEach( type =>{
        pokemonType.innerHTML += `<img src="resources/pokemon_types/${type.type.name}.png" alt="">`;
    });
}


// Toggle/Change between shiny and default version
shinyToggle.addEventListener("change", function() {
    if(shinyToggle.checked){
        shinyImg.style.display = "block";
        defImg.style.display = "none";
    } else {
        shinyImg.style.display = "none";
        defImg.style.display = "block";
    }
});


// POKÉMON TYPE CHART

const typeList = document.getElementById("type-col");
const typeChosen = document.getElementById("the-type");
const typeStrenghts = document.getElementById("strengths");
const typeWeaknesses = document.getElementById("weaknesses");
const typeNoEffects = document.getElementById("no-effects");
const typeNoEffectTo = document.getElementById("no-effect-to");


// Get all types on window load
window.onload = function() {
    // there are 18 major pokemon types in total
    let typeAmount = 18;

    // fetch each type and send it to display
    for(let i = 1; i <= typeAmount; i++){
        fetch(`https://pokeapi.co/api/v2/type/${i}/`)
        .then(response => response.json())
        .then(data => {
            displayType(data);
        })
        .catch(err => console.error(err));
    }  
};

// Create a button for each type, set the value as the type name for interactions
function displayType(typeData){
    typeList.innerHTML += `<input id="type-btn" type="image" src="resources/pokemon_types/${typeData.name}.png" onClick="typeEffects(this.value)" value="${typeData.name}"/>`;
};

// Get the type name and fetch interactions
function typeEffects(clicked_value){
    fetch(`https://pokeapi.co/api/v2/type/${clicked_value}`)
    .then(response => response.json())
    .then(data => {
        type = data;

        // Create an image for each interaction
        
        // display chosen type
        typeChosen.innerHTML = "";
        typeChosen.innerHTML += `<img src="resources/pokemon_types/${clicked_value}.png" alt="">`;

        // Strenghts
        typeStrenghts.innerHTML = "";
        type.damage_relations.double_damage_to.forEach( type =>{
            typeStrenghts.innerHTML += `<img src="resources/pokemon_types/${type.name}.png" alt="">`;
        });
        // Weaknesses
        typeWeaknesses.innerHTML = "";
        type.damage_relations.double_damage_from.forEach( type =>{
            typeWeaknesses.innerHTML += `<img src="resources/pokemon_types/${type.name}.png" alt="">`;
        });
        // Immune to
        typeNoEffectTo.innerHTML = "";
        type.damage_relations.no_damage_to.forEach( type =>{
            typeNoEffectTo.innerHTML += `<img src="resources/pokemon_types/${type.name}.png" alt="">`;
        });
        // Immunity from
        typeNoEffects.innerHTML = "";
        type.damage_relations.no_damage_from.forEach( type =>{
            typeNoEffects.innerHTML += `<img src="resources/pokemon_types/${type.name}.png" alt="">`;
        });
    })
    .catch(err => console.error(err));
}