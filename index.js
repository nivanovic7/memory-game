"use strict";

const form = document.querySelector("form");
const board = document.querySelector(".board");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  form.classList.add("hide");

  const boardSize = document.querySelector(
    "input[name=cell-num]:checked"
  ).value;

  createBoard(boardSize);
  populateCells(boardSize);
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
