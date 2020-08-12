/*----- constants -----*/
const PLAYER = {
  p1: 1,
  p1Color: 'rgba(255,0,115,1)',
  p1Glow: '0 0 10px 5px rgba(255,0,115,0.8)',
  p1TxtShd:
    '1px 1px 2px black, 0 0 20px rgba(92, 255, 230, 0.6), 0 0 20px rgba(92, 255, 240, 0.5), 0 0 20px rgba(92, 255, 255, 0.7)',
  p1Hover: "#grid > div:hover,#grid > div:focus,#grid > div:active {box-shadow: 0 0 50px 20px rgba(255, 0, 91, 0.9), inset 0 0 30px 5px #fff,0 0 10px #fff;background-color: rgba(255, 0, 91, 1);}",
  p2: -1,
  p2Color: 'rgba(92,225,230,1)',
  p2Glow: '0 0 10px 5px rgba(92,255,230,0.8)',
  p2TxtShd:
    '1px 1px 2px black, 0 0 20px rgba(255, 0, 115, 1), 0 0 20px rgba(255, 0, 100, 1), 0 0 20px rgba(255, 0, 90, 1)',
  p2Hover: "#grid > div:hover,#grid > div:focus,#grid > div:active {box-shadow: 0 0 50px 20px rgba(92, 255, 230, 0.9), inset 0 0 30px 5px #fff,0 0 10px #fff;background-color: rgba(92, 255, 230, 1);}"
};

/*----- app's state (variables) -----*/
let board;
let turn;
let winner;

/*----- cached element references -----*/
const playerTurnEl = document.getElementById('playerTurn');
const allColumnEls = document.querySelectorAll(
  '.c0, .c1, .c2, .c3, .c4, .c5, .c6'
);
const gameStateEl = document.getElementById('gameState');
const playerEl = document.getElementById('player-turn');
const styleCSS = document.createElement('style');

/*----- event listeners -----*/
document.getElementById('resetbtn').addEventListener('click', eraseBoard);

/*----- functions -----*/
function init() {
  // Initialize the game board, winner, turn, & add event listeners to all div's on game board
  board = {
    c0: [null, null, null, null, null, null],
    c1: [null, null, null, null, null, null],
    c2: [null, null, null, null, null, null],
    c3: [null, null, null, null, null, null],
    c4: [null, null, null, null, null, null],
    c5: [null, null, null, null, null, null],
    c6: [null, null, null, null, null, null],
  };
  for (i of allColumnEls) {
    i.addEventListener('click', handleClick);
  }
  winner = null;
  turn = 1;
  gameStateEl.textContent = 'MAKE YOUR MOVE!';
  render();
}

function handleClick(evt) {
  // get target id and class name
  const playerRow = parseInt(evt.target.id);
  const playerColumn = evt.target.className;
  if (!board[playerColumn].includes(null)) return;
  // find the index of the first null value and splice the array
  const idx = board[playerColumn].findIndex((e) => e === null);
  board[playerColumn].splice(idx, 1, turn);
  if (turn === -1) {
    player2Go(playerColumn, idx);
  }
  if (turn === 1) {
    player1Go(playerColumn, idx);
  }
  isGameOver();
  turn *= -1;
  render(turn);
}

function player2Go(playerColumn, idx) {
  // convert int back to string and locate the div id that needs to change and apply changes
  let columnNum = playerColumn.substr(1);
  let id = `${idx},${columnNum}`;
  let clicked = document.getElementById(id);
  clicked.style.backgroundColor = PLAYER.p2Color;
  clicked.style.boxShadow = PLAYER.p2Glow;
  clicked.removeEventListener('click', handleClick);
  if (styleCSS.styleSheet) {
    styleCSS.styleSheet.cssText = css;
  } else {
    styleCSS.appendChild(document.createTextNode(PLAYER.p2Hover));
  }
}

function player1Go(playerColumn, idx) {
  // same as player2Go but for player 1
  let columnNum = playerColumn.substr(1);
  let id = `${idx},${columnNum}`;
  let clicked = document.getElementById(id);
  clicked.style.backgroundColor = PLAYER.p1Color;
  clicked.style.boxShadow = PLAYER.p1Glow;
  clicked.removeEventListener('click', handleClick);
  styleCSS.appendChild(document.createTextNode(PLAYER.p1Hover));
}

function isGameOver() {
  // convert board object's key values to arrays
  let boardArr = Object.values(board);
  // check columns
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 4; row++) {
      if (
        boardArr[col][row] == 1 &&
        boardArr[col][row + 1] == 1 &&
        boardArr[col][row + 2] == 1 &&
        boardArr[col][row + 3] == 1
      ) {
        winner = boardArr[col][row];
        gameIsOver();
        return winner;
      } else if (
        boardArr[col][row] == -1 &&
        boardArr[col][row + 1] == -1 &&
        boardArr[col][row + 2] == -1 &&
        boardArr[col][row + 3] == -1
      ) {
        winner = boardArr[col][row];
        gameIsOver();
        return winner;
      }
    }
  }
  // check rows
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < 6; row++) {
      if (
        boardArr[col][row] == 1 &&
        boardArr[col + 1][row] == 1 &&
        boardArr[col + 2][row] == 1 &&
        boardArr[col + 3][row] == 1
      ) {
        winner = boardArr[col][row];
        gameIsOver();
        return winner;
      } else if (
        boardArr[col][row] == -1 &&
        boardArr[col + 1][row] == -1 &&
        boardArr[col + 2][row] == -1 &&
        boardArr[col + 3][row] == -1
      ) {
        winner = boardArr[col][row];
        gameIsOver();
        return winner;
      }
    }
  }
  // check diagonal right
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < 3; row++) {
      if (
        boardArr[col][row] === 1 &&
        boardArr[col + 1][row + 1] === 1 &&
        boardArr[col + 2][row + 2] === 1 &&
        boardArr[col + 3][row + 3] === 1
      ) {
        winner = boardArr[col][row];
        gameIsOver();
        return winner;
      } else if (
        boardArr[col][row] === -1 &&
        boardArr[col + 1][row + 1] === -1 &&
        boardArr[col + 2][row + 2] === -1 &&
        boardArr[col + 3][row + 3] === -1
      ) {
        winner = boardArr[col][row];
        gameIsOver();
        return winner;
      }
    }
  }
  // check diagonal left
  for (let col = 0; col < 4; col++) {
    for (let row = 3; row < 6; row++) {
      if (
        boardArr[col][row] === 1 &&
        boardArr[col + 1][row - 1] === 1 &&
        boardArr[col + 2][row - 2] === 1 &&
        boardArr[col + 3][row - 3] === 1
      ) {
        winner = boardArr[col][row];
        gameIsOver();
        return winner;
      } else if (
        boardArr[col][row] === -1 &&
        boardArr[col + 1][row - 1] === -1 &&
        boardArr[col + 2][row - 2] === -1 &&
        boardArr[col + 3][row - 3] === -1
      ) {
        winner = boardArr[col][row];
        gameIsOver();
        return winner;
      }
    }
  }
  return null;
}

function render(turn) {
  // render message on screen and switch player image
  if (winner === null) {
    if (turn === 1) {
      playerEl.src = 'imgs/Player1.png';
      gameStateEl.style.color = PLAYER.p1Color;
      gameStateEl.style.textShadow = PLAYER.p1TxtShd;
    } else if (turn === -1) {
      playerEl.src = 'imgs/Player2.png';
      gameStateEl.style.color = PLAYER.p2Color;
      gameStateEl.style.textShadow = PLAYER.p2TxtShd;
    }
  } else if (winner === 'T') {
    gameStateEl.textContent = "IT'S A TIE!";
    gameStateEl.style.color = 'black';
    gameStateEl.style.textShadow = '0 0 20px white, 0 0 20px white';
  } else if (winner === 1) {
    gameStateEl.textContent = 'PLAYER 1 WINS!';
    gameStateEl.style.color = PLAYER.p1Color;
    gameStateEl.style.textShadow = PLAYER.p1TxtShd;
  } else if (winner === -1) {
    gameStateEl.textContent = 'PLAYER 2 WINS!';
    gameStateEl.style.color = PLAYER.p2Color;
    gameStateEl.style.textShadow = PLAYER.p2TxtShd;
  }
}

function gameIsOver() {
  // remove event listeners from all divs on game board
  for (i of allColumnEls) {
    i.removeEventListener('click', handleClick);
  }
}
function eraseBoard() {
  //change the divs background color back to default and remove glow
  for (i of allColumnEls) {
    i.style.backgroundColor = '#666';
    i.style.boxShadow = null;
  }
  init();
}

init();
