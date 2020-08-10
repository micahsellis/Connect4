/*----- constants -----*/
const PLAYER = {
  p1: 1,
  p1Color: 'rgba(255,0,91,1)',
  p1Glow: '0 0 10px 5px rgba(255,0,91,0.8)',
  p2: -1,
  p2Color: 'rgba(92,225,230,1)',
  p2Glow: 'rgba(92,255,230,1)',
};

/*----- app's state (variables) -----*/
let board;
let turn;
let winner;

/*----- cached element references -----*/
const playerTurnEl = document.getElementById('playerTurn');
const allColumnEls = document.querySelectorAll(
  '.circle0, .circle1, .circle2, .circle3, .circle4, .circle5, .circle6'
);
const column0Els = document.querySelectorAll('.c0');
const column1Els = document.querySelectorAll('.c1');
const column2Els = document.querySelectorAll('.c2');
const column3Els = document.querySelectorAll('.c3');
const column4Els = document.querySelectorAll('.c4');
const column5Els = document.querySelectorAll('.c5');
const column6Els = document.querySelectorAll('.c6');
const gaemStateEl = document.getElementById('gameState');

/*----- event listeners -----*/
for (i of column0Els) {
  i.addEventListener('click', handleClick);
}
for (i of column1Els) {
  i.addEventListener('click', handleClick);
}
for (i of column2Els) {
  i.addEventListener('click', handleClick);
}
for (i of column3Els) {
  i.addEventListener('click', handleClick);
}
for (i of column4Els) {
  i.addEventListener('click', handleClick);
}
for (i of column5Els) {
  i.addEventListener('click', handleClick);
}
for (i of column6Els) {
  i.addEventListener('click', handleClick);
}
document.getElementById('resetbtn').addEventListener('click', eraseBoard);

/*----- functions -----*/
function init() {
  board = {
    c0: [null, null, null, null, null, null, null],
    c1: [null, null, null, null, null, null, null],
    c2: [null, null, null, null, null, null, null],
    c3: [null, null, null, null, null, null, null],
    c4: [null, null, null, null, null, null, null],
    c5: [null, null, null, null, null, null, null],
    c6: [null, null, null, null, null, null, null],
  };
  turn = 1;
  winner = null;
  gaemStateEl.textContent = 'MAKE YOUR MOVE!';
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
}
function player2Go(playerColumn, idx) {
  console.log('P2!');
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
}
function render() {
  console.log('render');
}
function eraseBoard() {
  console.log('reset');
  init();
}

init();
