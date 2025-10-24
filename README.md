# Pokémon Assistant
This site has a few tools for pokémon-related needs. You can search through a pokédex either by a pokémons name, or choose a random one. You can also look up what effects types have on other types using the type chart. As an addition, you can also use the notes-page for notetaking.

## View of the pokédex
![View of the pokédex](/resources/site_screenshots/pokedex.png)

The site's pokédex searches through [PokéAPI](https://pokeapi.co/) by the name typed in. When using the random-button, the site fetches all pokémons and counts their ID's. After counting, the site draws a random ID to show a pokémon.

## View of the type chart
![View of the type chart](/resources/site_screenshots/typechart.png)

You can choose a pokémon's type from the list to see how it interacts with other types. The types in the list are fetched from the same PokéAPI as in the pokédex.

## View of notes
![View of notes](/resources/site_screenshots/notes.png)

Here you're able to write notes and inspect previous ones. The note system uses local storage to store your notes.

## How to use?

Copy the repository on your device using git clone (below) or your preferred method. To view the site, use (for example) VSCode Live Server to open a local port. You must host the site in some way for the API to work.

`git clone https://github.com/nellaSoudunsaari/website-assignment.git`
