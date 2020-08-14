/*----- constants -----*/
const PLAYER = {
  p1: 1,
  p1Color: 'rgba(255,0,115,1)',
  p1Glow: '0 0 10px 5px rgba(255,0,115,0.8)',
  p1TxtShd:
    '1px 1px 2px black, 0 0 20px rgba(92, 255, 230, 0.6), 0 0 20px rgba(92, 255, 240, 0.5), 0 0 20px rgba(92, 255, 255, 0.7)',
  p2: -1,
  p2Color: 'rgba(92,225,230,1)',
  p2Glow: '0 0 10px 5px rgba(92,255,230,0.8)',
  p2TxtShd:
    '1px 1px 2px black, 0 0 20px rgba(255, 0, 115, 1), 0 0 20px rgba(255, 0, 100, 1), 0 0 20px rgba(255, 0, 90, 1)',
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
const p1WinEl = document.getElementById('p1Win');
const p2WinEl = document.getElementById('p2Win');

/*----- functions -----*/
const init = () => {
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
};

const handleClick = (evt) => {
  // get target id and class name
  const playerRow = parseInt(evt.target.id);
  const playerColumn = evt.target.className;
  if (!board[playerColumn].includes(null)) return;
  // find the index of the first null value and splice the board array with the player's value
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
};

const player2Go = (playerColumn, idx) => {
  // convert int back to string and locate the div id that needs to change colors and apply changes
  let columnNum = playerColumn.substr(1);
  let id = `${idx},${columnNum}`;
  let clicked = document.getElementById(id);
  playP1();
  clicked.style.backgroundColor = PLAYER.p2Color;
  clicked.style.boxShadow = PLAYER.p2Glow;
  clicked.removeEventListener('click', handleClick);
};

const player1Go = (playerColumn, idx) => {
  let columnNum = playerColumn.substr(1);
  let id = `${idx},${columnNum}`;
  let clicked = document.getElementById(id);
  playP2();
  clicked.style.backgroundColor = PLAYER.p1Color;
  clicked.style.boxShadow = PLAYER.p1Glow;
  clicked.removeEventListener('click', handleClick);
};

const isGameOver = () => {
  let boardArr = Object.values(board);
  checkColumns(boardArr);
  checkRows(boardArr);
  checkDiagRight(boardArr);
  checkDiagLeft(boardArr);
};

const checkColumns = (boardArr) => {
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
};

const checkRows = (boardArr) => {
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
};

const checkDiagRight = (boardArr) => {
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
};

const checkDiagLeft = (boardArr) => {
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
};

const render = (turn) => {
  switch (winner) {
    case 1:
      setTimeout(playWin, 500);
      gameStateEl.textContent = '';
      gameStateEl.style.color = PLAYER.p1Color;
      gameStateEl.style.textShadow = PLAYER.p1TxtShd;
      playerEl.src = 'imgs/OVER.png';
      p1WinEl.style.zIndex = '2';
      break;
    case -1:
      setTimeout(playWin, 500);
      gameStateEl.textContent = '';
      gameStateEl.style.color = PLAYER.p2Color;
      gameStateEl.style.textShadow = PLAYER.p2TxtShd;
      playerEl.src = 'imgs/OVER.png';
      p2WinEl.style.zIndex = '2';
      break;
    default:
      switch (turn) {
        case 1:
          playerEl.src = 'imgs/Player1.png';
          gameStateEl.style.color = PLAYER.p1Color;
          gameStateEl.style.textShadow = PLAYER.p1TxtShd;
          break;
        case -1:
          playerEl.src = 'imgs/Player2.png';
          gameStateEl.style.color = PLAYER.p2Color;
          gameStateEl.style.textShadow = PLAYER.p2TxtShd;
          break;
        default:
          break;
      }
  }
};

const gameIsOver = () => {
  // remove event listeners from all divs on game board
  for (i of allColumnEls) {
    i.removeEventListener('click', handleClick);
  }
};

const eraseBoard = () => {
  //change the divs background color back to default and remove glow
  for (i of allColumnEls) {
    i.style.backgroundColor = '#666';
    i.style.boxShadow = null;
  }
  p1WinEl.style.zIndex = '0';
  p2WinEl.style.zIndex = '0';
  playerEl.src = 'imgs/Player1.png';
  init();
};

const playP1 = () => {
  var audio = document.createElement('audio');
  audio.src = 'https://media.vocaroo.com/mp3/b1Ia7Ua0BZg';
  audio.play();
};

const playP2 = () => {
  var audio = document.createElement('audio');
  audio.src = 'https://media.vocaroo.com/mp3/3MbQmhoW1dY';
  audio.play();
};

const playWin = () => {
  var audio = document.createElement('audio');
  audio.src = 'https://media.vocaroo.com/mp3/6JPJXooVio8';
  audio.play();
};

/*----- event listeners -----*/
document.getElementById('resetbtn').addEventListener('click', eraseBoard);

init();
