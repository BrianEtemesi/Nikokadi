import { startGame, 
    initializeGame, 
    initializePlayer, 
    } from './data_table.js';

let startGameData;

// player2Deck for testing function drawCardFromPile()
const player2deck = document.getElementById('player2-deck');
// Call Functions when window loads
window.onload = async function () {
    // buildDeck();
    // shuffleDeck();
    
    // Initialize Game on Load
    const gameData = await initializeGame("cash_game")
    const gameId = gameData.game_id
    console.log("[CLIENT]", gameData.game_id)

    // Initialize Player
    const playerData = await initializePlayer(gameId, "Oduor", 1000)
    console.log("[CLIENT]", playerData.player_id)
    console.log("[CLIENT]", playerData.player_deck)


    // Initialize Player 2
    const playerData2 = await initializePlayer(gameId, "Alice", 2000)
    console.log("[CLIENT]", playerData2.player_id)
    console.log("[CLIENT]", playerData2.player_deck)


    // Start the game
    startGameData = await startGame(gameId)
    console.log("[CLIENT] Deck", startGameData.deck)
    console.log("[CLIENT] Top Card: ", startGameData.top_card)
    console.log("[CLIENT] First Player: ", startGameData.first_player)

    
    populatePlayersDeck(playerData.player_deck)
    populatePickingPile(startGameData.deck)
    assignTopCard(startGameData.top_card)

}
// Hide containers until x no of players
let numOfPlayers = 2
if (numOfPlayers === 1) {
    // Show only first container
    document.getElementById("player-2-container").style.display = "block";
} else if (numOfPlayers === 2) {
    // Show both containers
    document.getElementById("player-1-container").style.display = "block";
    document.getElementById("player-2-container").style.display = "block";
} 

// Highglight active player's box 
let activePlayer = 2;

let activeContainer = document.querySelector(`#player-${activePlayer}-card`)
activeContainer.classList.add('player-active')

// Show controls when button is pressed
var longPressTimeout

let player2Button = document.getElementById('player2-btn-controls');
let player2Icon = document.getElementById('player2-icon')
let player2ControlsBody = document.getElementById('player2-controls-body');


player2Button.addEventListener('click', function () {
    toggleControls(player2Button, player2ControlsBody, player2Icon);
});

player2Button.addEventListener('touchstart', function () {
    toggleControls(player2Button, player2ControlsBody, player2Icon);
    longPressTimeout = setTimeout(function (){
        showTooltip(player2Button);
    }, 100);
});

player2Button.addEventListener('touchend', function () {
    clearTimeout(longPressTimeout);
});

// Function to toggleControls
function toggleControls(dropdownButton, controlsBody, dropdownIcon) {
    // Togggle controls visibility
    if (controlsBody.style.display === 'none') {
        controlsBody.style.display = 'block';
        // Chaning Icons
        dropdownIcon.classList.remove('bi-chevron-bar-up');
        dropdownIcon.classList.add('bi-chevron-bar-down');

        // Changing Tooltip
        dropdownButton.removeAttribute('data-bs-original-title');
        dropdownButton.setAttribute('data-bs-original-title', "Hide Controls");

        // Delay display of controls for 100 seconds to show animation
        setTimeout(function () {
            controlsBody.style.opacity = '1';
            controlsBody.classList.add('show');
        }, 100);
    } else {

        // Chaning Tooltip
        dropdownButton.removeAttribute('data-bs-original-title');
        dropdownButton.setAttribute('data-bs-original-title', "Show Controls");

        // Hiding controls 
        controlsBody.style.opacity = '0';

        setTimeout(function (){
            controlsBody.classList.remove('show');
            controlsBody.style.display = 'none';
            dropdownIcon.classList.add('bi-chevron-bar-up');
            dropdownIcon.classList.remove('bi-chevron-bar-down');
        }, 100);
    }
    // Hide tooltip after displaying
    let tooltip = bootstrap.Tooltip.getInstance(dropdownButton);
    if (tooltip) {
        setTimeout(function () {
            tooltip.hide();
        }, 100)
    }
}

// Tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

// Function to show tooltip
function showTooltip(dropdownButton) {
    let tooltip = bootstrap.Tooltip.getInstance(dropdownButton);
    tooltip.show();

    if (tooltip) {
        setTimeout(function () {
            tooltip.hide();
        }, 2000); 
    }
}

// Timer
var player2timerButton = document.getElementById('player2-timerButton');
var player2timerValue = document.getElementById('player2-timerValue');

// Timer Variables
let seconds = 0;
let minutes = 0;
let isRunning = false;
let timerInterval;

// Function to update the timer
function updateTimer() {
    seconds++;

    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }

    // Format the time as hh:mm
    let formattedTime = ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
    player2timerValue.textContent = formattedTime;
}

// Function to start the timer
function startTimer() {
    console.log("Starting timer");
    isRunning = true; 
    timerInterval = setInterval(updateTimer, 1000);
}

// Function to stop the timer
function stopTimer() {
    console.log("Stopping Timer");
    isRunning = false;
    clearInterval(timerInterval);
}

// Function to reset the timer
function resetTimer() {
    seconds = 0;
    minutes = 0;
    player2timerValue.textContent = "00:00"; 
    console.log("Reseting timer");
}

// Event Listener for the timer
player2timerButton.addEventListener('click', function () {
    if (isRunning){
        stopTimer();
    } else {
        startTimer();
    }
});


// Resting the timer
let clickCount = 0;
player2timerButton.addEventListener('mousedown', function () {
    clickCount++;

    if (clickCount === 1){
        clickTimeout = setTimeout(function () {
            clickCount = 0;
        }, 300);
    } else if (clickCount === 2) {
        clearTimeout(clickTimeout);
        clickCount = 0;
        resetTimer();
        stopTimer();
    }
})

// Function to build the deck before shuffling
// function buildDeck() {
//     let suits = ['H', 'S', 'D', 'C'];
//     let ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
//     deck = [];

//     for (let i = 0; i < suits.length; i++) {
//         for (let j = 0; j < ranks.length; j++) {
//             deck.push(ranks[j] + '-' + suits[i]); // K-C, A-D
//         }
//     }

//     console.log(deck);
// }


// Function to shuffle the deck
// function shuffleDeck() {
//     for (let i = 0; i < deck.length; i++) {
//         let j = Math.floor(Math.random() * deck.length); // one digit
//         let temp = deck[i];
//         deck[i] = deck[j];
//         deck[j] = temp;
//     }

//     console.log(deck)
// }

// This function is used to add styles to a deck card and necessary attributes
function addDeckCardStyles(cardDiv, card) {
    cardDiv.style.backgroundImage = "url('assets/deck-cards/v2/" + card + ".png')";
    cardDiv.classList.add('deck-card')
    cardDiv.setAttribute('draggable', true);
    cardDiv.setAttribute('id', 'card-' + cardCounter++);
    
    // Drag Listeners
    cardDiv.addEventListener('dragstart', handleCardDragStart);
    cardDiv.addEventListener('dragend', handleCardDragEnd);

    // Touch Listeners
    cardDiv.addEventListener('touchstart', handleTouchStart);
    cardDiv.addEventListener('touchend', handleTouchEnd);
    cardDiv.addEventListener('touchmove', handleTouchMove);
    cardDiv.addEventListener('touchend', handleTouchDrop);

}


// Populate a player's deck
function populatePlayersDeck(playersDeck) {
    let playerDeckContainer = document.getElementById('player2-deck')

    for (let i = 0; i < playersDeck.length; i++) {
        let cardDiv = document.createElement('div')
        let card = playersDeck[i]
        cardDiv.style.backgroundImage = "url('assets/deck-cards/v2/" + card + ".png')";
        cardDiv.classList.add('deck-card')
        cardDiv.setAttribute('draggable', true);
        cardDiv.setAttribute('id', 'card-' + cardCounter++);
        
        // Drag Listeners
        cardDiv.addEventListener('dragstart', handleCardDragStart);
        cardDiv.addEventListener('dragend', handleCardDragEnd);

        // Touch Listeners
        cardDiv.addEventListener('touchstart', handleTouchStart);
        cardDiv.addEventListener('touchend', handleTouchEnd);
        cardDiv.addEventListener('touchmove', handleTouchMove);
        cardDiv.addEventListener('touchend', handleTouchDrop);

        playerDeckContainer.appendChild(cardDiv)
        console.log("[CLEINT] Populating Card", card)
    }
}

// Populate the playing pile or picking pile container
let pickingPile = document.querySelector('.playing-pile');
function populatePickingPile(gameDeck){
    let zIndex = 0;
    let deckSize = gameDeck.length;
    console.log("Remaining Cards in the deck: " + deckSize);
    
    for (let i = 0; i < deckSize; i++){
        let card = gameDeck.pop();
        let cardDiv = document.createElement('div');
        let cardDivUrl = "assets/deck-cards/v2/" + card + '.png';
        cardDiv.style.backgroundImage = "url('assets/deck-cards/v2/" + card + ".png')";
        cardDiv.classList.add('playing-pile-card');
        cardDiv.classList.add('deck-card');
        cardDiv.setAttribute('id', 'card-' + cardCounter++);
        const topCard = playingCardsContainer.lastElementChild;    
        if (topCard) {
            let topCardStyle = getComputedStyle(topCard);
            let topCardZIndex = parseInt(topCardStyle.getPropertyValue('z-index'));
            zIndex = topCardZIndex + 1;
        }
        cardDiv.style.zIndex = zIndex;
        pickingPile.appendChild(cardDiv);
    }
    console.log("Playing cards have been populated");
    console.log("[CLIENT] Game Deck:", gameDeck);
}

// This function assigns the top card when the game starts
function assignTopCard(topCard) {
    let communityCardContainer = document.querySelector('.community-container')
    let topCardDiv = document.createElement('div')
    topCardDiv.style.backgroundImage =  "url('assets/deck-cards/v2/" + topCard + ".png')";
    topCardDiv.classList.add('deck-card')
    topCardDiv.classList.add('community-card')
    communityCardContainer.appendChild(topCardDiv)
}


// Populate player's deck with (n) number of cards

let cardCounter = 1;
function populateCards(n, playerId){
    let deckContainers = document.querySelectorAll('.deck');
    deckContainers.forEach((deckContainer) => {
        let numOfCards = n;
        while (numOfCards != 0){
            let cardImg = document.createElement('div');
            let card = deck.pop();
            cardImgUrl = "assets/deck-cards/v2/" + card + '.png';
            cardImg.style.backgroundImage = "url('assets/deck-cards/v2/" + card + ".png')";
            cardImg.classList.add('deck-card');
            cardImg.setAttribute('draggable', true);
            cardImg.setAttribute('id', 'card-' + cardCounter++);
            cardImg.addEventListener('dragstart', handleCardDragStart);
            cardImg.addEventListener('dragend', handleCardDragEnd);

            // Touch Listeners
            cardImg.addEventListener('touchstart', handleTouchStart);
            cardImg.addEventListener('touchend', handleTouchEnd);
            cardImg.addEventListener('touchmove', handleTouchMove);
            cardImg.addEventListener('touchend', handleTouchDrop);

            deckContainer.appendChild(cardImg);
            console.log(`Image Url: ${cardImgUrl}`);
            console.log(`Populating card ${card}`);
            numOfCards--;
        }
    });
}

// Function to populate the playingCards Container with Cards stacked on
// each other
let playingCardsContainer = document.querySelector('.playing-pile');
function populatePlayingCards(){
    let zIndex = 0;
    let deckLength = deck.length;
    console.log("Remaining Cards: " + deckLength);
    while (deckLength != 0) {
        let card = deck.pop();
        let cardImg = document.createElement('div');
        cardImgUrl = "assets/deck-cards/v2/" + card + '.png';
        cardImg.style.backgroundImage = "url('assets/deck-cards/v2/" + card + ".png')";
        cardImg.classList.add('playing-pile-card');
        cardImg.classList.add('deck-card');
        cardImg.setAttribute('id', 'card-' + cardCounter++);
        const topCard = playingCardsContainer.lastElementChild;    
        if (topCard) {
            let topCardStyle = getComputedStyle(topCard);
            let topCardZIndex = parseInt(topCardStyle.getPropertyValue('z-index'));
            zIndex = topCardZIndex + 1;
        }
        cardImg.style.zIndex = zIndex;
        playingCardsContainer.appendChild(cardImg);
        deckLength--;
    }
    console.log("Playing cards have been populated");

    console.log(deck);
}

const pileContainer = document.querySelector('.pile-container');
// Function to handle the dragging of the cards
function handleCardDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.currentTarget.style.opacity = '0.5';
    console.log("Starting Drag");
}

// Function to handle drag end
function handleCardDragEnd(event) {
    event.currentTarget.style.opacity = '1';
    console.log("End of Drag");
}

// Function to handle pile container drag over
function handlePileDragOver(event) {
    event.preventDefault();
    console.log("Handling pile drag over");
}

let currentDraggedCard = null;
// Function to handle touch start
function handleTouchStart(event) {
    currentDraggedCard = event.currentTarget;
    event.currentTarget.style.opacity = '0.5';
    console.log("Starting Touch");
}

// Function to handle touch end
function handleTouchEnd(event) {
    event.currentTarget.style.opacity = '1';
    console.log("End of Touch");
}

// Function to handle touch move
function handleTouchMove(event) {
    event.preventDefault();

    // Make the card visual when moving
    if (currentDraggedCard) {
        const touch = event.touches[0];
        const offsetX = touch.clientX - touch.target.offsetLeft;
        const offsetY = touch.clientY - touch.target.offsetTop;

        currentDraggedCard.style.left = touch.clientX - offsetX + 'px';
        currentDraggedCard.style.top = touch.clientY - offsetY + 'px';
    }

    console.log("Handling touch move");
}

// Function to handle touch drop to the pile container
function handleTouchDrop(event) {
    event.preventDefault();
    if (currentDraggedCard) {
        
        currentDraggedCard.classList.add('community-card')
        let zIndex = 0;
        let leftOffset = 0;
        const topCard = pileContainer.lastElementChild;

        if (topCard) {
            let topCardStyle = getComputedStyle(topCard);
            let topCardZIndex = parseInt(topCardStyle.getPropertyValue('z-index'));
            // let topCardLeftOffset = parseInt(topCardStyle.getPropertyValue('left'));
            // leftOffset = topCardLeftOffset + 10;
            zIndex = topCardZIndex + 1;
        }
        currentDraggedCard.style.zIndex = zIndex.toString();
        // currentDraggedCard.style.left = leftOffset + 'px';
        currentDraggedCard.removeAttribute('draggable');
        currentDraggedCard.removeEventListener('touchstart', handleTouchStart);
        currentDraggedCard.removeEventListener('touchmove', handleTouchMove);
        currentDraggedCard.removeEventListener('touchend', handleTouchEnd);
        pileContainer.appendChild(currentDraggedCard);
        currentDraggedCard.style.opacity = '1';
        currentDraggedCard = null;
    } else {
        console.log("Card not found for touch drop");
    }
}

// Function to handle card drop on pile container
function handleCardDrop(event) {
    event.preventDefault();
    let cardId = event.dataTransfer.getData('text/plain');
    let card = document.getElementById(cardId);
    if (card) {
        card.classList.add('community-card');
        let topCard = pileContainer.lastElementChild;
        let leftOffset = 0;
        let zIndex = 1;


        if (topCard) {
            let topCardStyle = getComputedStyle(topCard);
            let topCardZIndex = parseInt(topCardStyle.getPropertyValue('z-index'));
            // let topCardLeftOffset = parseInt(topCardStyle.getPropertyValue('left'));
            // leftOffset = topCardLeftOffset + 10;
            zIndex = topCardZIndex + 1;
        }
        card.style.zIndex = zIndex;
        // card.style.left = leftOffset + 'px';
        card.removeAttribute('draggable');
        pileContainer.appendChild(card);
    } else {
        console.log('Card Element Not found');
    }
}

// Add event listener for each card for dragging
let cards = document.querySelectorAll('.deck-card');
cards.forEach(function (card) {
    card.addEventListener('dragstart', handleCardDragStart);
    card.addEventListener('dragend', handleCardDragEnd);
    card.addEventListener('dragover', handlePileDragOver);
    card.addEventListener('drop', handleCardDrop);

    // Touch Listeners
    card.addEventListener('touchstart', handleTouchStart);
    card.addEventListener('touchend', handleTouchEnd);
    card.addEventListener('touchmove', handleTouchMove);
    card.addEventListener('touchend', handleTouchDrop);
});

// Add Event listeners to the pile container for dropping
pileContainer.addEventListener('dragover', handlePileDragOver);
pileContainer.addEventListener('drop', handleCardDrop);
pileContainer.addEventListener('touchmove', handleTouchMove);
pileContainer.addEventListener('touchdrop', handleTouchDrop);


// Draw Card From Pile
function drawCardFromPile(deckCallback, toPlayerDeck) {
    
    let cardDiv = document.createElement('div')
    console.log("[DEBUG (drawCardFromPile)] Start Game Data Deck: ", deckCallback())
    let card = deckCallback().pop()
    if (card) {
        addDeckCardStyles(cardDiv, card)    

        toPlayerDeck = document.getElementById('player2-deck')
        toPlayerDeck.appendChild(cardDiv)
    } else {
        console.log("No card left in the pile")
    }
}

// Event Listener for drawing card from pile
playingCardsContainer.addEventListener('click',function () {
    drawCardFromPile(() => startGameData.deck, player2deck);
})
