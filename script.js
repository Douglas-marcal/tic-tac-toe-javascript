const squaresContainer = document.querySelector('.squares-container');

const createBoard = () => {
  for (let index = 0; index < 9; index += 1) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.id = index;
    squaresContainer.appendChild(square);
  }
};

createBoard();

let playerTurn = 0;
let gameOver = false;
let board = ['', '', '', '', '', '', '', '', ''];
const squares = document.querySelectorAll('.square');
const players = ['X', 'O'];
const winsConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const isGameOver = () => {
  let result = false;
  winsConditions.forEach((winCondition) => {
    if (
      board[winCondition[0]] === board[winCondition[1]] &&
      board[winCondition[0]] === board[winCondition[2]] &&
      board[winCondition[0]] !== ''
    ) {
      result = true;
    }
  });

  return result;
};

document.querySelector('.player-turn').textContent = players[playerTurn];

const gamePlay = ({ target }) => {
  if (target.textContent === '') {
    if (!gameOver) {
      target.textContent = players[playerTurn];
      board[target.id] = players[playerTurn];
      gameOver = isGameOver();
      if (gameOver) {
        const screenGameOver = document.querySelector('.screen-game-over');
        screenGameOver.style.display = 'flex';
        const winnerMessage = document.querySelector('.display-player-winner');
        winnerMessage.textContent =`Jogador ${players[playerTurn]} venceu.`
        return
      }
      if (playerTurn) {
        playerTurn = 0;
      } else {
        playerTurn = 1;
      }
      document.querySelector('.player-turn').textContent = players[playerTurn];
    }
  }
}

squares.forEach((square) => {
  square.addEventListener('click', gamePlay);
});

const buttonReset = document.querySelector('.play-again');
buttonReset.addEventListener('click', () => {
  squaresContainer.innerHTML = '';
  playerTurn = 0;
  gameOver = false;
  board = ['', '', '', '', '', '', '', '', ''];
  createBoard();
  const screenGameOver = document.querySelector('.screen-game-over');
  screenGameOver.style.display = 'none';
  document.querySelector('.player-turn').textContent = players[playerTurn];
  const squares = document.querySelectorAll('.square');
  squares.forEach((square) => {
    square.addEventListener('click', gamePlay);
  });
});
