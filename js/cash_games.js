import { initializeGame, startGame, initializePlayer } from './data_table.js'

// When new button is clicked, initialize a new Game
const newGameBtn = document.getElementById('dev_btn-new-game')

newGameBtn.addEventListener('click', function() {
    let loading = document.createElement('span')
    loading.classList.add('spinner-grow')
    loading.classList.add('spinner-grow-sm')
    loading.setAttribute('role', 'status')
    loading.setAttribute('aria-hidden', true)
    newGameBtn.appendChild(loading)
    // const initGameData = initializeGame("cash_game")

    setTimeout(function () {
        newGameBtn.removeChild(loading)

        if (initGameData.game_id) {
            // Redirect to Table.html
            window.location.href = "table.html"

        } else {
            console.log("NO GAME DATA")
        }
    }, 2000)

})