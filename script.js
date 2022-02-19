let playerTurn = 0;
let gameOver = false;
let wasATie = false;
let board = ['', '', '', '', '', '', '', '', ''];
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

const createBoard = (squaresContainer) => {
  for (let index = 0; index < 9; index += 1) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.id = index;
    squaresContainer.appendChild(square);
  }
};

const isGameOver = () => (
  winsConditions.some((winCondition) => (
      board[winCondition[0]] === board[winCondition[1]] &&
      board[winCondition[0]] === board[winCondition[2]] &&
      board[winCondition[0]] !== ''
    )
  )
);


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

      (playerTurn) ? (playerTurn = 0) : (playerTurn = 1);

      wasATie = board.every((square) => square !== '');

      if (wasATie) {
        const screenGameOver = document.querySelector('.screen-game-over');
        screenGameOver.style.display = 'flex';
        const tieMessage = document.querySelector('.display-player-winner');
        tieMessage.textContent = 'Deu velha!';
      }

      document.querySelector('.player-turn').textContent = players[playerTurn];
    }
  }
}

const startOfTheGame = () => {
  playerTurn = 0;
  gameOver = false;
  board = ['', '', '', '', '', '', '', '', ''];
  const squaresContainer = document.querySelector('.squares-container');
  const initialPlayer = document.querySelector('.player-turn');
  const screenGameOver = document.querySelector('.screen-game-over');
  
  squaresContainer.innerHTML = '';
  initialPlayer.textContent = players[playerTurn];
  createBoard(squaresContainer);
  screenGameOver.style.display = 'none';


  const squares = document.querySelectorAll('.square');

  squares.forEach((square) => {
    square.addEventListener('click', gamePlay);
  });
};

startOfTheGame();


const buttonReset = document.querySelector('.play-again');
buttonReset.addEventListener('click', () => {  
  startOfTheGame();
});
