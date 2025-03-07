// DOM elements
const pokemonCollection = document.getElementById('pokemon-collection');
const emptyCollection = document.getElementById('empty-collection');
const totalCaught = document.getElementById('total-caught');
const resetButton = document.getElementById('reset-progress');

// Ash's Pokemon from different regions (same as in script.js)
const ashPokemon = [
    // Kanto
    'pikachu', 'bulbasaur', 'charmander', 'squirtle', 'pidgeotto', 'butterfree', 'kingler', 'muk', 'tauros', 
    // Johto
    'heracross', 'bayleef', 'cyndaquil', 'totodile', 'noctowl', 'phanpy',
    // Hoenn
    'swellow', 'sceptile', 'corphish', 'torkoal', 'glalie',
    // Sinnoh
    'staraptor', 'torterra', 'infernape', 'buizel', 'gliscor', 'gible',
    // Unova
    'unfezant', 'oshawott', 'pignite', 'snivy', 'scraggy', 'leavanny', 'palpitoad', 'boldore', 'krookodile',
    // Kalos
    'greninja', 'talonflame', 'hawlucha', 'goodra', 'noivern',
    // Alola
    'rowlet', 'lycanroc', 'incineroar', 'melmetal',
    // Journeys
    'lucario', 'dragonite', 'gengar', 'sirfetch\'d', 'dracovish'
];

// Load correctly guessed Pokemon from localStorage
function loadGuessedPokemon() {
    const savedGuessed = localStorage.getItem('correctlyGuessedPokemon');
    let correctlyGuessed = [];
    
    if (savedGuessed) {
        correctlyGuessed = JSON.parse(savedGuessed);
    }
    
    return correctlyGuessed;
}

// Fetch Pokemon data by name
async function fetchPokemonByName(name) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching ${name}:`, error);
        return null;
    }
}

// Create a Pokemon card element
function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card animate__animated animate__fadeIn';
    
    const image = document.createElement('img');
    image.src = pokemon.sprites.other['official-artwork'].front_default || 
               pokemon.sprites.front_default;
    image.alt = pokemon.name;
    
    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    
    card.appendChild(image);
    card.appendChild(name);
    
    return card;
}

// Display all guessed Pokemon
async function displayGuessedPokemon() {
    const correctlyGuessed = loadGuessedPokemon();
    totalCaught.textContent = correctlyGuessed.length;
    
    // Filter to only Ash's Pokemon
    const ashGuessed = correctlyGuessed.filter(pokemon => ashPokemon.includes(pokemon));
    
    if (ashGuessed.length === 0) {
        pokemonCollection.classList.add('hidden');
        emptyCollection.classList.remove('hidden');
        return;
    }
    
    pokemonCollection.classList.remove('hidden');
    emptyCollection.classList.add('hidden');
    
    // Clear previous content
    pokemonCollection.innerHTML = '';
    
    // Create loading message
    const loading = document.createElement('p');
    loading.textContent = 'Loading Ash\'s Pokémon...';
    pokemonCollection.appendChild(loading);
    
    // Fetch data for each guessed Pokemon
    const pokemonPromises = ashGuessed.map(name => fetchPokemonByName(name));
    const pokemonDataList = await Promise.all(pokemonPromises);
    
    // Remove loading message
    pokemonCollection.removeChild(loading);
    
    // Add each Pokemon card to the collection
    pokemonDataList.forEach(pokemon => {
        if (pokemon) {
            const card = createPokemonCard(pokemon);
            pokemonCollection.appendChild(card);
        }
    });
}

// Reset progress
function resetProgress() {
    if (confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
        localStorage.removeItem('pokemonQuizScore');
        localStorage.removeItem('correctlyGuessedPokemon');
        displayGuessedPokemon();
    }
}

// Event listeners
resetButton.addEventListener('click', resetProgress);

// Initialize the journey page
window.addEventListener('DOMContentLoaded', () => {
    displayGuessedPokemon();
});