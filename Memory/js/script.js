const cardSection = document.getElementById("game-board");

// variables de suivi
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedCount = 0;

// variable avec entier généré aléatoirement entre 1 et 100
const dimension = 150;
const imgStart = Math.floor(Math.random() * 100) + 1;

// liste pour les 8 images
const images = [];

for (let i = 0; i < 8; i++) {
  images.push(`https://picsum.photos/seed/${imgStart + i}/${dimension}/${dimension}`);
}

// debug
console.log(images);

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

// debug
console.log(shuffle(cards));

function initGame() {
  const sortedCards = shuffle(cards);

  sortedCards.forEach(createHTML);
}

function createHTML(card) {
  const divCard = document.createElement("div");

  divCard.classList.add("card");
  divCard.dataset.value = card;

  divCard.setAttribute("role", "button");
  divCard.setAttribute("tabindex", "0");

  // écoute du clic sur la carte
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

  console.log("Nombre de coups :", moves);

  checkMatch();
}

function checkMatch() {
  // les deux cartes sont identiques
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matchedCount += 2;

    resetTurn();
    return;
  }

  // les deux cartes sont différentes
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

initGame();