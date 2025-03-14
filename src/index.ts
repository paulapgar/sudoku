
import { Board } from './classes/board';
import { Util } from './classes/util';
import { PuzzleData } from './classes/util';

import { origText } from './classes/util';
import { scanText } from './classes/util';

// Load in the puzzles data from json file
const puzzles: PuzzleData = require("../build/puzzles.json");

const scanButton = document.getElementById("scan") as HTMLButtonElement;
const puzzleSelect = document.getElementById("puzzles") as HTMLSelectElement;

scanButton.addEventListener("click", handleClickOnScan);
puzzleSelect.addEventListener("change", handleSelectPuzzle);

for (const puz in puzzles.puzzleList) {
     const optionElement = document.createElement('option');
     optionElement.value = puzzles.puzzleList[puz].name;
     optionElement.text = puzzles.puzzleList[puz].label;
     puzzleSelect.add(optionElement);
 }

let myBoard : Board;

function setBoard(puzzleSelected:string) : Board {
     let board:Board;
     
     for (const puz in puzzles.puzzleList) {
          if (puzzles.puzzleList[puz].name === puzzleSelected) {
               let size = puzzles.puzzleList[puz].size;
               board = new Board(size);
               for (let y = 0; y < size; y++) {
                    for (let x = 0; x < size; x++) {
                         if (puzzles.puzzleList[puz].board[y][x] > 0) {
                              board.setCellKnown(x,y,puzzles.puzzleList[puz].board[y][x]);
                         }
                    }
               }
               return board;
          }
     }
     // Return empty board if selected puzzle not found
     return board = new Board(9);
}

function handleClickOnScan(): void {
     if (!myBoard) return;
     if (myBoard.setupDone === false) return;

     if (myBoard) {
          scanText.value="";
          let count: number = -1;
          while (myBoard.needEval === true) {
               myBoard.processBoardStep();
               count++;
          }

          Util.appendText(scanText, `Finished With Board  (${count} moves)`);
          myBoard.printBoard(scanText);
          scanText.scrollTop = scanText.scrollHeight;
          myBoard.setupDone = false;
     }
}

function handleSelectPuzzle(): void {
     if (puzzleSelect.value !== "Choose") {
          myBoard = setBoard(puzzleSelect.value);
          origText.value="";
          scanText.value="";
          Util.appendText(origText, "Initial Board");
          myBoard.printBoard(origText)
          myBoard.setupDone = true;
     }
     // Pick original Choose option and board should be blank
     else {
          myBoard = setBoard(puzzleSelect.value);
          origText.value="";
          scanText.value="";
          myBoard.setupDone = false;
     }
}
