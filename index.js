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
