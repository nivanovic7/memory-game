"use strict";

const form = document.querySelector("form");
const board = document.querySelector(".board");
const newGameBtn = document.querySelector(".new-game-btn");
const playersContainer = document.querySelector(".players");

let players;
let currPlayerIndex = 0;
let openedCells = [];
let matchedCount = 0;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  form.classList.add("hide");
  board.classList.remove("hide");
  newGameBtn.classList.remove("hide");
  playersContainer.classList.remove("hide");

  const boardSize = document.querySelector(
    "input[name=cell-num]:checked"
  ).value;

  createBoard(boardSize);
  populateCells(boardSize);

  const numOfPlayers = document.querySelector(
    "input[name=player-num]:checked"
  ).value;
  addPlayers(numOfPlayers);
  players = document.querySelectorAll(".player");
  players[0].classList.add("current-player");

  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", function () {
      cell.classList.add("cell-click");
      checkMatch(cell);
    });
  });
});

newGameBtn.addEventListener("click", function () {
  form.classList.remove("hide");
  board.classList.add("hide");
  newGameBtn.classList.add("hide");
  playersContainer.classList.add("hide");
  document.querySelector(".message").style.visibility = "hidden";

  board.innerHTML = "";
  playersContainer.innerHTML = "";
});

const createBoard = function (boardSize) {
  for (let i = 0; i < boardSize; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let i = 0; i < boardSize; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.insertAdjacentElement("beforeend", cell);
    }

    board.insertAdjacentElement("beforeend", row);
  }
};

const populateCells = function (boardSize) {
  let [...cells] = document.querySelectorAll(".cell");
  const numOfDuplicates = boardSize === "4" ? 8 : 18;
  for (let i = 1; i <= numOfDuplicates; i++) {
    setNumToRandomCell(i, cells);
    setNumToRandomCell(i, cells); //set the same number to two cells so we have duplicates
  }
};

const setNumToRandomCell = function (num, cells) {
  let randomCellIndex = Math.floor(Math.random() * cells.length); // select random cell
  const cell = cells.splice(randomCellIndex, 1); //remove selected cell from array
  cell[0].textContent = num; //add number to that cell
};

const addPlayers = function (numberOfPlayers) {
  for (let i = 1; i <= numberOfPlayers; i++) {
    createPlayerIndicator(i);
  }
};

const createPlayerIndicator = function (playerNum) {
  const player = document.createElement("div");
  player.classList.add("player");

  const playerName = document.createElement("p");
  playerName.classList.add("player-name");
  playerName.textContent = `Player ${playerNum}`;

  const playerScore = document.createElement("p");
  playerScore.classList.add("playerScore");
  playerScore.textContent = 0;

  player.insertAdjacentElement("beforeend", playerName);
  player.insertAdjacentElement("beforeend", playerScore);

  document.querySelector(".players").insertAdjacentElement("beforeend", player);
};

const checkMatch = function (cell) {
  let match = false;
  openedCells.push(cell);
  if (openedCells.length === 2) {
    if (openedCells[0].textContent !== openedCells[1].textContent) {
      setTimeout(resetCells, 400);
      addScore(match);
      highlightCurrPlayer();
    } else {
      match = true;
      addScore(match);
      openedCells.forEach((cell) => cell.classList.add("remove-cell"));
      openedCells = [];
      const neededMatchesForWin = document.querySelectorAll(".cell").length / 2;
      matchedCount++;
      matchedCount === neededMatchesForWin && youWin();
    }
  }
};

const resetCells = function () {
  openedCells.forEach((cell) => cell.classList.remove("cell-click"));
  openedCells = [];
};

const highlightCurrPlayer = function () {
  players.forEach((player) => {
    player.classList.remove("current-player");
  });

  players[currPlayerIndex].classList.add("current-player");
};

const addScore = function (match) {
  if (match) {
    players[currPlayerIndex].querySelector(".playerScore").textContent =
      +players[currPlayerIndex].querySelector(".playerScore").textContent + 1;
  } else {
    currPlayerIndex === players.length - 1
      ? (currPlayerIndex = 0)
      : currPlayerIndex++;
  }
};

const youWin = function () {
  const scores = document.querySelectorAll(".playerScore");
  const winner = [...players].reduce((acc, curr) => {
    return +acc.querySelector(".playerScore").textContent >
      +curr.querySelector(".playerScore").textContent
      ? acc
      : curr;
  }, [...players][0]);
  gameOver(winner.querySelector(".player-name").textContent);
  matchedCount = 0;
};

const gameOver = function (player) {
  document.querySelector(".message").textContent = ` ${player} wins!!!`;
  document.querySelector(".message").style.visibility = "visible";
};
