const cardSection = document.getElementById("game-board");
const timerDisplay = document.getElementById("timer");
const result = document.getElementById("result");

// variables de suivi
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedCount = 0;

// variables du chronomètre
let seconds = 0;
let timerInterval = null;

// variable avec entier généré aléatoirement entre 1 et 100
const dimension = 150;
const imgStart = Math.floor(Math.random() * 100) + 1;

// liste pour les 8 images
const images = [];

for (let i = 0; i < 8; i++) {
  images.push(`https://picsum.photos/seed/${imgStart + i}/${dimension}/${dimension}`);
}

// liste de cartes avec les doublons
let cards = [...images, ...images];

// algorithme de Fisher-Yates pour shuffle
function shuffle(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

// formatage du temps en mm:ss
function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const secondes = sec % 60;

  return `${String(minutes).padStart(2, "0")}:${String(secondes).padStart(2, "0")}`;
}

// démarrage du chronomètre
function startTimer() {
  timerDisplay.textContent = formatTime(seconds);

  timerInterval = setInterval(() => {
    seconds++;

    timerDisplay.textContent = formatTime(seconds);
  }, 1000);
}

function initGame() {
  // vide le plateau
  cardSection.innerHTML = "";

  // reset des variables
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  moves = 0;
  matchedCount = 0;
  seconds = 0;

  // supprime l'ancien timer
  clearInterval(timerInterval);
  timerInterval = null;

  // vide le résultat
  result.textContent = "";

  // mélange les cartes
  const sortedCards = shuffle(cards);

  sortedCards.forEach(createHTML);

  // relance le chrono
  startTimer();
}

function createHTML(card) {
  const divCard = document.createElement("div");

  divCard.classList.add("card");
  divCard.dataset.value = card;

  divCard.setAttribute("role", "button");
  divCard.setAttribute("tabindex", "0");

  divCard.addEventListener("click", () => handleCardClick(divCard));

  cardSection.appendChild(divCard);
}

function handleCardClick(card) {
  // empêche les actions interdites
  if (lockBoard) return;
  if (card === firstCard) return;
  if (card.classList.contains("matched")) return;
  if (card.innerHTML !== "") return;

  // affiche l'image
  card.innerHTML = `<img src="${card.dataset.value}" alt="">`;

  // premier clic
  if (firstCard === null) {
    firstCard = card;
    return;
  }

  // deuxième clic
  secondCard = card;
  lockBoard = true;
  moves++;

  checkMatch();
}

function checkMatch() {
  // les cartes sont identiques
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matchedCount += 2;

    resetTurn();
    checkVictory();

    return;
  }

  // les cartes sont différentes
  setTimeout(() => {
    firstCard.innerHTML = "";
    secondCard.innerHTML = "";

    resetTurn();
  }, 800);
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

// vérification de la victoire
function checkVictory() {
  if (matchedCount === cards.length) {
    clearInterval(timerInterval);

    result.textContent = `Bravo ! ${moves} coups en ${formatTime(seconds)}`;
  }
}

initGame();