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

/*----- event listeners -----*/
for (i of allColumnEls) {
  i.addEventListener('click', handleClick);
}
document.getElementById('resetbtn').addEventListener('click', eraseBoard);

/*----- functions -----*/
function init() {
  board = {
    c0: [null, null, null, null, null, null],
    c1: [null, null, null, null, null, null],
    c2: [null, null, null, null, null, null],
    c3: [null, null, null, null, null, null],
    c4: [null, null, null, null, null, null],
    c5: [null, null, null, null, null, null],
    c6: [null, null, null, null, null, null],
  };
  turn = 1;
  winner = null;
  gameStateEl.textContent = 'MAKE YOUR MOVE!';
  render();
}
function handleClick(evt) {
  const playerRow = parseInt(evt.target.id);
  const playerColumn = evt.target.className;
  if (!board[playerColumn].includes(null)) return;
  const idx = board[playerColumn].findIndex((e) => e === null);
  board[playerColumn].splice(idx, 1, turn);
  if (turn === -1) {
    player2Go(playerColumn, idx);
  }
  if (turn === 1) {
    player1Go(playerColumn, idx);
  }
  winner = isGameOver();
  turn *= -1;
  render(turn);
}
function player2Go(playerColumn, idx) {
  let columnNum = playerColumn.substr(1);
  let id = `${idx},${columnNum}`;
  let clicked = document.getElementById(id);
  clicked.style.backgroundColor = PLAYER.p2Color;
  clicked.style.boxShadow = PLAYER.p2Glow;
  clicked.removeEventListener('click', handleClick);
}
function player1Go(playerColumn, idx) {
  let columnNum = playerColumn.substr(1);
  let id = `${idx},${columnNum}`;
  let clicked = document.getElementById(id);
  clicked.style.backgroundColor = PLAYER.p1Color;
  clicked.style.boxShadow = PLAYER.p1Glow;
  clicked.removeEventListener('click', handleClick);
}
function isGameOver() {
  console.log('game still in play');
  return null;
}
function render(turn) {
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
function eraseBoard() {
  console.log('reset');
  init();
}

init();
