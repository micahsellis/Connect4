/*----- constants -----*/
const PLAYER = {
    p1: 1,
    p1color: 'rgba(192,22,67,1)',
    p2: -1,
    p2color: 'rgba(38,166,173,1)'
};


/*----- app's state (variables) -----*/
let board;
let turn;
let winner;


/*----- cached element references -----*/
const playerTurnEl = document.getElementById("playerTurn");
const allColumnEls = document.querySelectorAll(".circle0, .circle1, .circle2, .circle3, .circle4, .circle5, .circle6");
const column0Els = document.querySelectorAll(".circle0");
const column1Els = document.querySelectorAll(".circle1");
const column2Els = document.querySelectorAll(".circle2");
const column3Els = document.querySelectorAll(".circle3");
const column4Els = document.querySelectorAll(".circle4");
const column5Els = document.querySelectorAll(".circle5");
const column6Els = document.querySelectorAll(".circle6");
const gaemStateEl = document.getElementById("gameState");



/*----- event listeners -----*/
for (i of column0Els) { i.addEventListener('click', handleColumn0Click) };
for (i of column1Els) { i.addEventListener('click', handleColumn1Click) };
for (i of column2Els) { i.addEventListener('click', handleColumn2Click) };
for (i of column3Els) { i.addEventListener('click', handleColumn3Click) };
for (i of column4Els) { i.addEventListener('click', handleColumn4Click) };
for (i of column5Els) { i.addEventListener('click', handleColumn5Click) };
for (i of column6Els) { i.addEventListener('click', handleColumn6Click) };
document.getElementById('resetbtn').addEventListener('click', eraseBoard);


/*----- functions -----*/
function init() {
    board = {
        c1: [null, null, null, null, null, null, null],
        c2: [null, null, null, null, null, null, null],
        c3: [null, null, null, null, null, null, null],
        c4: [null, null, null, null, null, null, null],
        c5: [null, null, null, null, null, null, null],
        c6: [null, null, null, null, null, null, null]
    };
    turn = 1;
    winner = null;
    gaemStateEl.textContent = "MAKE YOUR MOVE!";
    render();
}
function handleColumn0Click() {
    console.log('Column 0');
};
function handleColumn1Click() {
    console.log('Column 1');
};
function handleColumn2Click() {
    console.log('Column 2');
};
function handleColumn3Click() {
    console.log('Column 3');
};
function handleColumn4Click() {
    console.log('Column 4');
};
function handleColumn5Click() {
    console.log('Column 5');
};
function handleColumn6Click() {
    console.log('Column 6');
};
function isGameOver() {
    console.log('game still in play');
}
function render() {
    console.log('render');
};
function eraseBoard() {
    console.log('reset');
    init();
};
        
init();