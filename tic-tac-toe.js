/*
  Title: tic-tac-toe.js
  Author: John Davidson
  Date: 08/2/2024
  Description: Tic tac toe game logic
*/

let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
// Styling to be displayed on the winning blocks
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

console.log(boxes)

const O_TEXT = 'O';
const X_TEXT = 'X';
let currentPlayer = X_TEXT;

let spaces = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

// Function to run when one of the div boxes is clicked. 
// This function is attached to the Event Listener
function boxClicked(e) {
    const id = e.target.id;

    

    if(!spaces[id]) {
        spaces[id] = currentPlayer // Fills the array index with 'X' or 'O'
        e.target.innerText = currentPlayer // Assigns the value/innerText of the element to 'X' or 'O'
        
        if(playerHasWon() !== false) {
            playerText.innerText = `${currentPlayer} has won!`; // Change the title to name the winner
            let winning_blocks = playerHasWon(); // stores the winning combination

            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
            boxes.forEach(box => box.style.pointerEvents = 'none');
            return;      
        } 

        let checkSpaces = spaces.every(box => box !== null);
        if (checkSpaces) {
           playerText.innerText = 'Draw! No winner';
           return;
        }
        

        // Change the value of currentPlayer depending on whichever player just made a move.
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
    
}

// An array of winning combinations
const winningCombos = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
]

// Function that determines how a player wins
function playerHasWon() {
    // Iterate through each winning combination
    for (const condition of winningCombos) {
        // Destructure the winning combination into a, b, and c
        let [a, b, c] = condition
         // Check if the elements at positions a, b, and c in the spaces array are the same and not null
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            // Return the winning combination
            return [a, b, c]
        }
    }
    // If no winning combination is found, return false
    return false
}

// Add Event listener to restart button
// When clicked, it resets the spaces array elements back to null
// & the boxes array holding each div box value will be reset back to null as well
restartBtn.addEventListener('click', restart)

// Restarts the game
function restart() {
    // Reset boxes array to its original values and style
    boxes.forEach(box => { 
        box.innerText = '';
        box.style.backgroundColor = '';
        box.style.pointerEvents = 'auto'
    })

    // Reset spaces array
    spaces.fill(null)

    // Reset title of game
    playerText.innerText = 'Tic Tac Toe'

    

    // hardcode currentPlayer value back to X_TEXT
    currentPlayer = X_TEXT;
}

startGame();

