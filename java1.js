const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const restartBtn = document.querySelector(".restart");
const overlay = document.querySelector(".overlay");
const messageText = document.querySelector(".message-text");
const newGameBtn = document.querySelector(".new-game");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function handleClick(event) {
    const index = event.target.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    checkWinner();
    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.textContent = `Player ${board[a]} Wins!`;
            showEndScreen(`🎉 Player ${board[a]} Wins!`);
            gameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw!";
        showEndScreen("😲 It's a Draw!");
        gameActive = false;
    }
}

function showEndScreen(message) {
    messageText.textContent = message;
    overlay.style.display = "flex";
}

function restartGame() {
    board.fill("");
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
    cells.forEach(cell => cell.textContent = "");
    overlay.style.display = "none";
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);
newGameBtn.addEventListener("click", restartGame);
