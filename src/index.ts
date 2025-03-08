
import { Board } from './classes/board';
import { Util } from './classes/util';

import { origText } from './classes/util';
import { scanText } from './classes/util';

let myBoard : Board;

function setBoard(puzzleSelected:string) : Board {
     let board:Board;
     // Should read from JSON at least...
     switch (puzzleSelected) {
          case "Puzzle1":
               board = new Board(9);
               board.setCellKnown(1,0,6); board.setCellKnown(7,0,1); board.setCellKnown(0,1,1); board.setCellKnown(3,1,2); board.setCellKnown(6,1,7);
               board.setCellKnown(8,1,3); board.setCellKnown(3,2,6); board.setCellKnown(5,2,9); board.setCellKnown(7,2,8); board.setCellKnown(1,3,7);
               board.setCellKnown(2,3,5); board.setCellKnown(6,3,9); board.setCellKnown(4,4,5); board.setCellKnown(2,5,2); board.setCellKnown(6,5,5);
               board.setCellKnown(7,5,4); board.setCellKnown(1,6,8); board.setCellKnown(3,6,1); board.setCellKnown(5,6,6); board.setCellKnown(0,7,5);
               board.setCellKnown(2,7,3); board.setCellKnown(5,7,2); board.setCellKnown(8,7,8); board.setCellKnown(1,8,9); board.setCellKnown(7,8,2);
               return board;
               break;
          case "Puzzle88":
               board = new Board(9);
               board.setCellKnown(4,0,9); board.setCellKnown(7,0,7); board.setCellKnown(2,1,8); board.setCellKnown(8,1,3); board.setCellKnown(1,2,4);
               board.setCellKnown(5,2,6); board.setCellKnown(0,3,9); board.setCellKnown(4,3,1); board.setCellKnown(6,3,6); board.setCellKnown(0,4,1);
               board.setCellKnown(3,4,5); board.setCellKnown(5,4,3); board.setCellKnown(8,4,8); board.setCellKnown(2,5,4); board.setCellKnown(4,5,7);
               board.setCellKnown(8,5,2); board.setCellKnown(3,6,7); board.setCellKnown(7,6,8); board.setCellKnown(0,7,6); board.setCellKnown(6,7,7);
               board.setCellKnown(1,8,3); board.setCellKnown(4,8,4); board.setCellKnown(5,8,8); board.setCellKnown(3,0,1);
               return board;
               break;
          case "Puzzle174":
               board = new Board(9);
               board.setCellKnown(2,0,8); board.setCellKnown(6,0,4); board.setCellKnown(3,1,4); board.setCellKnown(5,1,5); board.setCellKnown(0,2,9);
               board.setCellKnown(2,2,7); board.setCellKnown(6,2,2); board.setCellKnown(8,2,6); board.setCellKnown(1,3,6); board.setCellKnown(4,3,3);
               board.setCellKnown(7,3,7); board.setCellKnown(3,4,8); board.setCellKnown(4,4,5); board.setCellKnown(5,4,9); board.setCellKnown(1,5,8);
               board.setCellKnown(4,5,7); board.setCellKnown(7,5,1); board.setCellKnown(0,6,1); board.setCellKnown(2,6,4); board.setCellKnown(6,6,3);
               board.setCellKnown(8,6,8); board.setCellKnown(3,7,2); board.setCellKnown(5,7,3); board.setCellKnown(2,8,6); board.setCellKnown(6,8,7);
               return board;
               break;
          case "Puzzle245":
               board = new Board(9);
               board.setCellKnown(5,0,7); board.setCellKnown(6,0,5); board.setCellKnown(0,1,5); board.setCellKnown(3,1,3); board.setCellKnown(0,2,6);
               board.setCellKnown(2,2,7); board.setCellKnown(8,2,2); board.setCellKnown(2,3,2); board.setCellKnown(5,3,3); board.setCellKnown(6,3,7);
               board.setCellKnown(4,4,5); board.setCellKnown(2,5,3); board.setCellKnown(3,5,4); board.setCellKnown(6,5,8); board.setCellKnown(0,6,3);
               board.setCellKnown(6,6,4); board.setCellKnown(8,6,8); board.setCellKnown(5,7,4); board.setCellKnown(8,7,9); board.setCellKnown(2,8,1); board.setCellKnown(3,8,5);
               return board;
               break;
          case "Puzzle16x16":
               board = new Board(16);
               board.setCellKnown(1,0,3); board.setCellKnown(3,0,6); board.setCellKnown(5,0,2); board.setCellKnown(7,0,11); board.setCellKnown(10,0,14); board.setCellKnown(12,0,1);
               board.setCellKnown(0,1,16); board.setCellKnown(3,1,14); board.setCellKnown(8,1,8); board.setCellKnown(13,1,15);
               board.setCellKnown(0,2,13); board.setCellKnown(3,2,2); board.setCellKnown(6,2,12); board.setCellKnown(7,2,1); board.setCellKnown(8,2,6); board.setCellKnown(9,2,16); board.setCellKnown(12,2,10); board.setCellKnown(15,2,5); 
               board.setCellKnown(2,3,10); board.setCellKnown(4,3,9); board.setCellKnown(6,3,5); board.setCellKnown(8,3,1); board.setCellKnown(9,3,3); board.setCellKnown(10,3,2); board.setCellKnown(13,3,16); board.setCellKnown(15,3,6);
               board.setCellKnown(0,4,4); board.setCellKnown(1,4,14); board.setCellKnown(5,4,1); board.setCellKnown(6,4,9); board.setCellKnown(9,4,10); board.setCellKnown(12,4,11); board.setCellKnown(13,4,5);
               board.setCellKnown(0,5,11); board.setCellKnown(1,5,2); board.setCellKnown(2,5,12); board.setCellKnown(4,5,13); board.setCellKnown(7,5,5); board.setCellKnown(9,5,14); board.setCellKnown(14,5,6); board.setCellKnown(15,5,9);
               board.setCellKnown(1,6,10); board.setCellKnown(3,6,3); board.setCellKnown(10,6,7); board.setCellKnown(11,6,13); board.setCellKnown(14,6,4); board.setCellKnown(15,6,2);
               board.setCellKnown(2,7,16); board.setCellKnown(4,7,7); board.setCellKnown(6,7,3); board.setCellKnown(10,7,6); board.setCellKnown(11,7,2); board.setCellKnown(12,7,13); board.setCellKnown(14,7,15);
               board.setCellKnown(1,8,15); board.setCellKnown(3,8,12); board.setCellKnown(4,8,4); board.setCellKnown(5,8,11); board.setCellKnown(9,8,6); board.setCellKnown(11,8,10); board.setCellKnown(13,8,7);
               board.setCellKnown(0,9,9); board.setCellKnown(1,9,11); board.setCellKnown(4,9,6); board.setCellKnown(5,9,5); board.setCellKnown(12,9,4); board.setCellKnown(14,9,12);
               board.setCellKnown(0,10,2); board.setCellKnown(1,10,5); board.setCellKnown(6,10,1); board.setCellKnown(8,10,15); board.setCellKnown(11,10,4); board.setCellKnown(13,10,8); board.setCellKnown(14,10,3); board.setCellKnown(15,10,14);
               board.setCellKnown(2,11,4); board.setCellKnown(3,11,1); board.setCellKnown(6,11,8); board.setCellKnown(9,11,2); board.setCellKnown(10,11,13); board.setCellKnown(14,11,10); board.setCellKnown(15,11,16);
               board.setCellKnown(0,12,10); board.setCellKnown(2,12,7); board.setCellKnown(5,12,6); board.setCellKnown(6,12,2); board.setCellKnown(7,12,9); board.setCellKnown(9,12,13); board.setCellKnown(11,12,3); board.setCellKnown(13,12,4);
               board.setCellKnown(0,13,5); board.setCellKnown(3,13,11); board.setCellKnown(6,13,13); board.setCellKnown(7,13,3); board.setCellKnown(8,13,2); board.setCellKnown(9,13,4); board.setCellKnown(12,13,14); board.setCellKnown(15,13,10);
               board.setCellKnown(2,14,3); board.setCellKnown(7,14,14); board.setCellKnown(12,14,8); board.setCellKnown(15,14,7);
               board.setCellKnown(3,15,4); board.setCellKnown(5,15,16); board.setCellKnown(8,15,12); board.setCellKnown(10,15,8); board.setCellKnown(12,15,15); board.setCellKnown(14,15,1);
               return board;
               break;
     }
     // Return empty board
     return board = new Board(9);
}

const puzzle = document.getElementById("puzzles") as HTMLSelectElement;
puzzle.addEventListener("change", handleSelectPuzzle);

const scan = document.getElementById("scan") as HTMLButtonElement;
scan.addEventListener("click", handleClickOnScan);

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

          Util.appendText(scanText, "Finished With Board  " + "(" + count + " moves)");
          myBoard.printBoard(scanText);
          scanText.scrollTop = scanText.scrollHeight;
          myBoard.setupDone = false;
     }
}

function handleSelectPuzzle(): void {
     if (puzzle.value !== "Choose") {
          myBoard = setBoard(puzzle.value);
          origText.value="";
          scanText.value="";
          Util.appendText(origText, "Initial Board");
          myBoard.printBoard(origText)
          myBoard.setupDone = true;
     }
}
