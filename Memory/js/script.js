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

// liste de cartes avec l es doublons
let cards = [...images, ...images];

// algorithme de Fisher-Yates pour shuffle
function shuffle(cards){
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        const temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }

    return cards;
}

// debug
console.log(shuffle(cards));

document.addEventListener("DOMContentLoaded", function(){
    
});