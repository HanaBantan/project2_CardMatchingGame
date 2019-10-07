/*
 * Create a list that holds all of your cards
 */
let cardIconsArr = ["fa-diamond", "fa-bicycle", "fa-bomb", "fa-leaf", "fa-anchor", "fa-paper-plane-o",
    "fa-cube", "fa-bolt", "fa-diamond", "fa-bicycle", "fa-bomb", "fa-leaf", "fa-anchor", "fa-paper-plane-o",
    "fa-cube", "fa-bolt"];

let redo = document.querySelector(".restart");
const gameCard = document.querySelectorAll(".card");
const rating = document.querySelectorAll(".star");
let time = document.querySelector(".time");
let moves = document.querySelector(".moves");
const cardIcons = document.querySelectorAll(".cards");
let clicked = new Array();
let matchs = 0;
let ratingCounter = 3;
let moveCounter = 0;
let array;
var count = 0;
var timers;

// Shuffle function  
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function matchCard(card) {
    card.classList.remove("open", "show");
    card.classList.add("match");

};
//compare two cards and stop the game if 8 cards match
function chekTowCards(card1, card2) {
    let x = card1.firstElementChild.className;
    let y = card2.firstElementChild.className;
    if (x === y) {

        matchCard(card1);
        matchCard(card2);

        matchs++;
        if (matchs == 8) {
            setTimeout(function () { gameOver(); }, 1000);
        }
    }
    else {
        setTimeout(function () {
            card1.classList.remove('open', 'show');
            card2.classList.remove('open', 'show');
        }, 1000);
    }
};
// shuffle the cards and start the game
function insertIcons() {

    array = shuffle(cardIconsArr);

    gameCard.forEach(function (card) {
        card.className = 'card';
    });
    let i = 0;
    cardIcons.forEach(function (card) {
        card.className = `cards fa ${array[i]}`;
        i++;
    });

}
insertIcons();
//clicked open cards and remove stars for rating
function cardClicked(card) {
    if (card.className === "card") {
        moveCounter++;
        moves.innerHTML = moveCounter;
        switch (clicked.length) {
            case 0:
                card.classList.add("open", "show");
                clicked.push(card);
                break;
            case 1:
                card.classList.add("open", "show");
                let card1 = clicked.pop();

                let card2 = card;

                chekTowCards(card1, card2);
                break;
            default:
                break;
        }
        switch (moveCounter) {
            case 20:
                rating[0].classList.remove("fa-star");
                ratingCounter--;
                break;
            case 50:
                rating[1].classList.remove("fa-star");
                ratingCounter--;
                break;
            // case 70:
            //     rating[2].classList.remove("fa-star");
            //     break;
            default:
                break;
        }
    }
};
//cards Event Listener 
gameCard.forEach(
    function (card) {
        card.addEventListener('click', function () { cardClicked(card); });
    }
);
timedCount();
//redo Event Listener
redo.addEventListener('click', function () { redoGame(); });

//to restart the game
function redoGame() {
    ratingCounter = 3;
    rating[0].classList.add("fa-star");
    rating[1].classList.add("fa-star");
    count = 0;
    timedCount();
    insertIcons();
    matchs = 0;
    moveCounter = 0;
    clicked = [];
    moves.innerHTML = "0";
};

function gameOver() {
    clearTimeout(timers);
    var modal = document.getElementById("modal");
    // Get the buttons to close or restart the game
    var redoBtn = document.getElementById("redoBtn");
    var closeBtn = document.getElementById("closeBtn");
    var text = document.getElementById("modal-content_text");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("button_modal")[0];
    modal.style.display = "block";
    text.innerHTML = "your time is " + (count-1) + " seconds, your rating " + ratingCounter + " stars";

    // restart botton
    redoBtn.onclick = function () {
        modal.style.display = "none";
        redoGame();
    }
    //close botton
    closeBtn.onclick = function () {
        modal.style.display = "none";
    }
    // When the player click X
    span.onclick = function () {
        modal.style.display = "none";
    }

}
//time function
function timedCount() {
    time.innerHTML = count;
    count++;
    timers = setTimeout(timedCount, 1000);
}

