// GLOBALS
// Initialize who's turn it is
let whosTurn = 1;
let gameOver = false;
const messageDiv = document.getElementById('message');
// A place to keep the squares each player has for checkWin
let player1Squares = [];
let player2Squares = [];

const squares = document.getElementsByClassName("square");
// console.log(squares);

for (let i = 0; i < squares.length; i++) {
    // console.log(squares[i]);
    squares[i].addEventListener('click', function () {
        markSquare(squares[i]);
    });
}

function markSquare(clickedSquare) {
    // console.log(squareID);
    // const clickedSquare = document.getElementById(squareID);
    // Two things happen when someone clicks on a square
    // 1. We change the DOM ... this part is for the user
    // 1a. Check to see if the user can mark that square;
    // 2. We change variables for JS
    // 2b.  Give control of the board to the other player
    if (!gameOver) {
        if (clickedSquare.innerHTML !== `-`) {
            // if there isn't a dash, someone has already taken this square.  Goodbye.
            messageDiv.innerHTML = `Sorry, that square is already taken.`;
        } else if (whosTurn === 1) {
            clickedSquare.innerHTML = `}{`;
            whosTurn = 2;
            player1Squares.push(clickedSquare.id);
            checkWin(1, player1Squares);
        } else {
            clickedSquare.innerHTML = `()`;
            whosTurn = 1;
            player2Squares.push(clickedSquare.id);
            checkWin(2, player2Squares);
        }
    }
}

const winningCombos = [
    ['A1', 'B1', 'C1'], //ROW 1
    ['A2', 'B2', 'C2'], //ROW 2
    ['A3', 'B3', 'C3'], //ROW 3
    ['A1', 'A2', 'A3'], //COLUMN 1
    ['B1', 'B2', 'B3'], //COLUMN 2
    ['C1', 'C2', 'C3'], //COLUMN 3
    ['A1', 'B2', 'C3'], //DIAG 1
    ['A3', 'B2', 'C1'] //DIAG 2
];

function checkWin(whoJustMarked, playerSquares) {
    // 1. What squares they have
    // 2. Are there 3 in a row
    //  Who is this?
    // console.log(whoJustMarked);
    // console.log(playerSquares);
    // Outer loop - check each winning combination
    // Inner loop - check each square inside each winning combination
    for (let i = 0; i < winningCombos.length; i++) {
        // Keep track of how many of this combo player has
        let squareCount = 0;
        for (let j = 0; j < winningCombos[i].length; j++) {
            const currentWinningSquare = winningCombos[i][j];
            // we need to check to see if the player has this square
            // indexOf, finds the first index of the given element. If it can't find it, it returns -1
            if (playerSquares.indexOf(currentWinningSquare) > -1) {
                squareCount++;
            }
        }
        if (squareCount === 3) {
            // HOORAY!!! The user had all 3 of the j squares in i combo.  We don't care where they are, we just know they are
            messageDiv.innerHTML = `Player ${whoJustMarked} has won the game!`;
            gameOver = true;
            for (let w = 0; w < winningCombos[i].length; w++) {
                const thisSquare = document.getElementById(winningCombos[i][w]);
                thisSquare.className += ` winning-square`;
            }
        }
    }

}

// const squares = document.getElementsByClassName("square");

// for (let i = 0; i < squares.length; i++) {
//     // console.log(squares[i]);
//     squares[i].addEventListener('click', markSquare);
// }

// function markSquare(event) {
//     // console.log(squareID.target.id);
//     // const clickedSquare = document.getElementById(squareID.target.id);
//     event.target.innerHTML = `X`;
// }