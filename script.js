const words = [
    "maison", "voiture", "chien", "chat", "arbre", "route", "soleil", "pluie", "vent", "fleur",
    "livre", "école", "ami", "famille", "heureux", "triste", "manger", "boire", "dormir", "rire",
    "pleurer", "courir", "marcher", "sauter", "grand", "petit", "fort", "faible", "chaud", "froid",
    "rapide", "lent", "nouveau", "vieux", "bon", "mauvais", "heure", "minute", "jour", "nuit",
    "semaine", "mois", "année", "ami", "ennemi", "joie", "peur", "colère", "amour", "haine",
    "couleur", "forme", "nombre", "lettre", "mot", "phrase", "musique", "film", "photo", "peinture",
    "écrire", "lire", "apprendre", "connaître", "comprendre", "penser", "sentir", "voir", "entendre", "toucher",
    "goûter", "odeur", "saveur", "ciel", "terre", "mer", "rivière", "montagne", "plaine", "forêt",
    "désert", "île", "pays", "ville", "village", "rue", "place", "pont", "église", "temple",
    "mosquée", "étoile", "lune", "planète", "univers", "science", "art", "sport", "jeu",
    "temps", "espace", "travail", "argent", "amitié", "amusement", "voyage", "santé", "courage", "beauté",
    "vérité", "mensonge", "politique", "histoire", "culture", "alimentation", "boisson", "nature", "technologie", "internet",
    "ordinateur", "téléphone", "écran", "clavier", "souris", "réseau", "connexion", "électricité", "énergie", "écologie",
    "environnement", "animaux", "plante", "insecte", "poisson", "oiseau", "mammifère", "informatique", "électricité", "ingénieur",
    "docteur", "enseignant", "étudiant", "aventure", "exploration", "découverte", "esprit", "âme", "corps", "sens",
    "défi", "réussite", "échec", "problème", "solution", "question", "réponse", "compétence", "talent", "créativité",
    "imagination", "rêve", "ambition", "passion", "émotion", "sentiment", "expression", "communication", "relation", "interaction",
    "fête", "célébration", "anniversaire", "cadeau", "sourire", "rire", "larme", "joie", "tristesse", "peur",
    "espoir", "courage", "amour", "haine", "paix", "guerre", "justice", "injustice", "liberté", "prison",
    "droit", "devoir", "responsabilité", "tolérance", "respect", "valeur", "principe", "éthique", "morale", "religion",
    "spiritualité", "philosophie", "science-fiction", "fantaisie", "réalité", "illusion", "mystère", "aventure", "action", "drame",
    "comédie", "roman", "poésie", "peinture", "musique", "danse", "théâtre", "cinéma", "photographie", "architecture",
    "mode", "design", "technologie", "innovation", "invention", "découverte", "exploration", "voyage", "aéroport", "avion",
    "train", "voiture", "vélo", "marche", "course", "natation", "escalade", "équitation", "football", "basket-ball",
    "tennis", "volley-ball", "baseball", "golf", "athlétisme", "ski", "snowboard", "surf", "plongée", "pêche",
    "camping", "randonnée", "jardinage", "cuisine", "recette", "restaurant", "café", "thé", "petit-déjeuner", "déjeuner",
    "dîner", "collation", "chocolat", "café", "thé", "jus", "eau", "vin", "bière", "cocktail",
    "soda", "pizza", "pâtes", "salade", "hamburger", "sandwich", "soupe", "glace", "gâteau", "cookie",
    "chocolat", "bonbon", "fruits", "légumes", "viande", "poisson", "pain", "fromage", "yogourt", "céréales",
    "œuf", "beurre", "huile", "sel", "poivre", "sucre", "farine", "papier", "stylo", "crayon",
    "livre", "journal", "magazine", "carte", "puzzle", "jeu", "musique", "film", "spectacle", "concert",
    "exposition", "festival", "théâtre", "opéra", "cirque", "parc", "zoo", "musée", "galerie", "monument",
    "château", "palais", "église", "mosquée", "temple", "synagogue", "cathédrale", "plage", "montagne", "forêt",
    "lac", "rivière", "cascade", "île", "côte", "désert", "jungle", "safari", "expédition", "aventure",
    "exploration", "randonnée", "camping", "pique-nique", "feu de camp", "étoiles", "lune", "soleil", "planète",
    "univers", "astronomie", "astrophysique", "cosmologie", "étoile filante", "constellation"
]; // 354 mots

const maxIncorrectGuesses = 6;

const wordDisplayField = document.getElementById("word-display");
const letterInputField = document.getElementById("letter-input");

let $chosenWord = "";
let $guessedWord = [];
let $incorrectGuesses = 0;


function chooseRandomWord() {
    $chosenWord = words[Math.floor(Math.random() * words.length)];
    $guessedWord = Array($chosenWord.length).fill('_');
    $incorrectGuesses = 0;
}

async function chooseRandomWordAPI() {
    // $chosenWord = words[Math.floor(Math.random() * words.length)];

    try {
        const response = await fetch('https://random-word-api.herokuapp.com/word?number=1&lang=fr'); // url
        const data = await response.json();

        if (data[0]) {
            $chosenWord = data[0].toLowerCase();
            $guessedWord = Array($chosenWord.length).fill('_');
            $incorrectGuesses = 0;
        } else {
            console.error('Pas de mot trouvé.');
        }

    } catch (error) {
        console.error(error);
    }
}

function displayWord() {
    wordDisplayField.textContent = $guessedWord.join(' ');
}

function guessLetter() {
    const letterInput = letterInputField.value.toLowerCase();

    if ($chosenWord.includes(letterInput)) {
        for (let i = 0; i < $chosenWord.length; i++) {
            if ($chosenWord[i] === letterInput) {
                $guessedWord[i] = letterInput;
            }
        }
    } else {
        $incorrectGuesses++;

        letterInputField.classList.add("explode");
        setTimeout(() => {
            letterInputField.classList.remove("explode");
        }, 500);
    }

    letterInputField.value = '';

    console.log('Incorrect guesses:', $incorrectGuesses);
    displayWord();
    checkGameStatus();
}

function checkGameStatus() {
    if ($guessedWord.join('') === $chosenWord) {
        console.log("Félicitations ! Vous avez deviné le mot.");
        showConfetti();
        resetGame().then(r => console.log('Game reset.' + ' ' + $chosenWord)).catch(e => console.error(e));
    } else if ($incorrectGuesses === maxIncorrectGuesses) {
        console.log(`Désolé, vous avez perdu. Le mot était "${$chosenWord}".`);
        resetGame().then(r => console.log('Game reset.' + ' ' + $chosenWord)).catch(e => console.error(e));
    }
}

async function resetGame() {
    // await chooseRandomWordAPI();
    chooseRandomWord();
    displayWord();
}

resetGame().then(r => console.log('Game started.' + ' ' + $chosenWord)).catch(e => console.error(e));


/**
 * Confetti animation
 */

function showConfetti() {
    const confettiContainer = document.getElementById("confetti-container");

    for (let i = 0; i < 100; i++) {

        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        confetti.style.backgroundColor = getRandomColor();

        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
        confettiContainer.appendChild(confetti);
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
