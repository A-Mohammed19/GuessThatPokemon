// Global variables
let currentPokemon = null;
let score = 0;
let correctlyGuessed = [];

// DOM elements
const pokemonImage = document.getElementById('pokemon-image');
const pokemonInfo = document.getElementById('pokemon-info');
const guessInput = document.getElementById('guess-input');
const submitBtn = document.getElementById('submit-btn');
const hintBtn = document.getElementById('hint-btn');
const skipBtn = document.getElementById('skip-btn');
const hintDisplay = document.getElementById('hint-display');
const resultMessage = document.getElementById('result-message');
const scoreDisplay = document.getElementById('score');

// Pokémon from the anime (including Ash's and other significant trainers')
const animePokemon = [
    // Ash's Pokémon
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
    'lucario', 'dragonite', 'gengar', 'sirfetch\'d', 'dracovish',
    
    // Misty's Pokémon
    'staryu', 'starmie', 'goldeen', 'psyduck', 'togepi', 'politoed', 'corsola', 'gyarados',
    
    // Brock's Pokémon
    'geodude', 'onix', 'zubat', 'golbat', 'crobat', 'vulpix', 'sudowoodo', 'forretress', 'ludicolo', 'marshtomp', 'croagunk',
    
    // Team Rocket's Pokémon
    'meowth', 'ekans', 'arbok', 'koffing', 'weezing', 'lickitung', 'victreebel', 'wobbuffet', 'mime jr.', 'carnivine', 'seviper', 'cacnea', 'chimecho', 'yamask', 'woobat', 'frillish', 'inkay', 'gourgeist',
    
    // May's Pokémon
    'torchic', 'combusken', 'blaziken', 'wurmple', 'silcoon', 'beautifly', 'skitty', 'bulbasaur', 'munchlax', 'squirtle', 'wartortle', 'eevee', 'glaceon',
    
    // Dawn's Pokémon
    'piplup', 'buneary', 'pachirisu', 'mamoswine', 'cyndaquil', 'quilava', 'togekiss',
    
    // Iris's Pokémon
    'axew', 'excadrill', 'emolga', 'dragonite', 'gible',
    
    // Cilan's Pokémon
    'pansage', 'crustle', 'stunfisk',
    
    // Clemont's Pokémon
    'bunnelby', 'chespin', 'luxio', 'dedenne',
    
    // Serena's Pokémon
    'fennekin', 'braixen', 'pancham', 'pangoro', 'eevee', 'sylveon',
    
    // Lillie's Pokémon
    'vulpix', 'snowy',
    
    // Kiawe's Pokémon
    'turtonator', 'marowak',
    
    // Lana's Pokémon
    'popplio', 'brionne', 'primarina', 'eevee',
    
    // Mallow's Pokémon
    'bounsweet', 'steenee', 'tsareena',
    
    // Sophocles' Pokémon
    'togedemaru', 'charjabug', 'vikavolt',
    
    // Goh's Pokémon
    'scorbunny', 'raboot', 'cinderace', 'sobble', 'inteleon',
    
    // Other notable Pokémon from the anime
    'mewtwo', 'mew', 'lugia', 'ho-oh', 'celebi', 'latios', 'latias', 'jirachi', 'deoxys', 'rayquaza', 
    'lucario', 'darkrai', 'shaymin', 'arceus', 'zorua', 'zoroark', 'victini', 'zekrom', 'reshiram', 
    'keldeo', 'meloetta', 'genesect', 'xerneas', 'yveltal', 'zygarde', 'diancie', 'hoopa', 'volcanion', 
    'magearna', 'marshadow', 'zeraora', 'meltan'
];

// Ash's Pokémon from different regions
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

// Load game state from localStorage
function loadGameState() {
    const savedScore = localStorage.getItem('pokemonQuizScore');
    const savedGuessed = localStorage.getItem('correctlyGuessedPokemon');
    
    if (savedScore) {
        score = parseInt(savedScore);
        scoreDisplay.textContent = score;
    }
    
    if (savedGuessed) {
        correctlyGuessed = JSON.parse(savedGuessed);
    }
}

// Save game state to localStorage
function saveGameState() {
    localStorage.setItem('pokemonQuizScore', score);
    localStorage.setItem('correctlyGuessedPokemon', JSON.stringify(correctlyGuessed));
}

// Fetch a Pokémon from the anime list
async function fetchAnimePokemon() {
    try {
        // Get a random Pokémon from our anime list
        const randomIndex = Math.floor(Math.random() * animePokemon.length);
        const pokemonName = animePokemon[randomIndex];
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        return null;
    }
}

// Display a new Pokémon
async function displayNewPokemon() {
    // Reset UI
    pokemonImage.classList.add('silhouette');
    pokemonImage.classList.remove('revealed');
    pokemonInfo.textContent = '';
    guessInput.value = '';
    hintDisplay.classList.add('hidden');
    resultMessage.classList.add('hidden');
    
    // Fetch new Pokémon from anime list
    currentPokemon = await fetchAnimePokemon();
    
    if (currentPokemon) {
        pokemonImage.src = currentPokemon.sprites.other['official-artwork'].front_default || 
                          currentPokemon.sprites.front_default;
        pokemonImage.alt = `Pokémon silhouette`;
    } else {
        pokemonInfo.textContent = 'Failed to load Pokémon. Please try again.';
    }
}

// Update the journey page
function updateJourneyPage(pokemonName, pokemonImageSrc) {
    // If we're on the journey page, update it immediately
    const journeyPageCollection = document.getElementById('pokemon-collection');
    if (journeyPageCollection) {
        // Create a new card for the journey page
        const card = document.createElement('div');
        card.className = 'pokemon-card animate__animated animate__fadeIn';
        
        const image = document.createElement('img');
        image.src = pokemonImageSrc;
        image.alt = pokemonName;
        
        const nameElement = document.createElement('div');
        nameElement.className = 'name';
        nameElement.textContent = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
        
        card.appendChild(image);
        card.appendChild(nameElement);
        journeyPageCollection.appendChild(card);
        
        // Update the total caught
        const totalCaught = document.getElementById('total-caught');
        if (totalCaught) {
            totalCaught.textContent = correctlyGuessed.length;
        }
        
        // Hide empty message if it's visible
        const emptyCollection = document.getElementById('empty-collection');
        if (emptyCollection) {
            emptyCollection.classList.add('hidden');
            journeyPageCollection.classList.remove('hidden');
        }
    }
}

// Show hint
function showHint() {
    if (!currentPokemon) return;
    
    // Different types of hints
    const hints = [
        `Type: ${currentPokemon.types.map(t => t.type.name).join('/')}`,
        `First letter: ${currentPokemon.name.charAt(0).toUpperCase()}`,
        `Length: ${currentPokemon.name.length} letters`,
        `Weight: ${currentPokemon.weight / 10} kg`,
        `Height: ${currentPokemon.height / 10} m`
    ];
    
    // Choose a random hint
    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    
    hintDisplay.textContent = randomHint;
    hintDisplay.classList.remove('hidden');
}

// Check if the guessed Pokémon is one of Ash's Pokémon
function isAshPokemon(name) {
    return ashPokemon.includes(name.toLowerCase());
}

// Check the guess
function checkGuess() {
    if (!currentPokemon) return;
    
    const guess = guessInput.value.trim().toLowerCase();
    const correctName = currentPokemon.name.toLowerCase();
    
    if (guess === correctName) {
        // Correct guess
        pokemonImage.classList.remove('silhouette');
        pokemonImage.classList.add('revealed');
        
        // Increment score
        score++;
        scoreDisplay.textContent = score;
        
        resultMessage.textContent = `Correct! That's ${currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1)}!`;
        resultMessage.className = 'correct';
        resultMessage.classList.remove('hidden');
        
        // Check if it's one of Ash's Pokémon
        if (isAshPokemon(correctName) && !correctlyGuessed.includes(correctName)) {
            correctlyGuessed.push(correctName);
            resultMessage.textContent += ` This is one of Ash's Pokémon!`;
            
            // Get image source for journey page
            const pokemonImageSrc = currentPokemon.sprites.other['official-artwork'].front_default || 
                                   currentPokemon.sprites.front_default;
            
            // Update journey page if we're on it
            updateJourneyPage(correctName, pokemonImageSrc);
        }
        
        // Save game state
        saveGameState();
        
        // Load new Pokémon after 2 seconds
        setTimeout(() => {
            displayNewPokemon();
        }, 2000);
    } else if (guess === '') {
        resultMessage.textContent = 'Please enter a guess!';
        resultMessage.className = 'incorrect';
        resultMessage.classList.remove('hidden');
    } else {
        // Incorrect guess
        resultMessage.textContent = 'Incorrect! Try again or use a hint.';
        resultMessage.className = 'incorrect';
        resultMessage.classList.remove('hidden');
    }
}

// Skip current Pokémon
function skipPokemon() {
    if (currentPokemon) {
        pokemonImage.classList.remove('silhouette');
        pokemonImage.classList.add('revealed');
        
        resultMessage.textContent = `It was ${currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1)}!`;
        resultMessage.className = 'incorrect';
        resultMessage.classList.remove('hidden');
        
        // Load new Pokémon after 2 seconds
        setTimeout(() => {
            displayNewPokemon();
        }, 2000);
    }
}

// Event listeners
submitBtn.addEventListener('click', checkGuess);
hintBtn.addEventListener('click', showHint);
skipBtn.addEventListener('click', skipPokemon);

// Listen for Enter key on input
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

// Initialize the game
window.addEventListener('DOMContentLoaded', () => {
    loadGameState();
    displayNewPokemon();
});