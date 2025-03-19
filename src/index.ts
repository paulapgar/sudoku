
import { Board } from './classes/board';
import { Util, Game } from './classes/util';
import { puzzleList } from './models/puzzles';
import { Elements } from './classes/util';

// Load in the puzzles data from json file
//const puzzles: PuzzleData = require("../build/puzzles.json");

// Add Selections from puzzleList
for (const puz in puzzleList) {
     const optionElement = document.createElement('option');
     optionElement.value = puzzleList[puz].name;
     optionElement.text = puzzleList[puz].label;
     Elements.puzzleSelect.add(optionElement);
}

// Set listeners
Elements.scanButton.addEventListener("click", handleClickOnScan);
Elements.puzzleSelect.addEventListener("change", handleSelectPuzzle);

function handleClickOnScan(): void {
     if (!Game.board) return;
     if (Game.board.setupDone === false) return;
 
     if (Game.board) {
          Elements.scanText.value="";
          let count: number = -1;
          while (Game.board.needEval === true) {
               Game.board.processBoardStep();
               count++;
          }
 
          Util.appendText(Elements.scanText, `Finished With Board  (${count} moves)`);
          Game.board.printBoard(Elements.scanText);
          Elements.scanText.scrollTop = Elements.scanText.scrollHeight;
          Game.board.setupDone = false;
     }
}
 
function handleSelectPuzzle(): void {
     if (Elements.puzzleSelect.value !== "Choose") {
          for (const puz in puzzleList) {
               if (puzzleList[puz].name === Elements.puzzleSelect.value) {
                    Game.board = new Board(puzzleList[puz]);
               }
          }
          Elements.origText.value="";
          Elements.scanText.value="";
          Util.appendText(Elements.origText, "Initial Board");
          Game.board.printBoard(Elements.origText)
          Game.board.setupDone = true;
     }
     // Pick original Choose option
     else {
          //Game.board = new Object();
          Elements.origText.value="";
          Elements.scanText.value="";
          Game.board.setupDone = false;
     }
}
