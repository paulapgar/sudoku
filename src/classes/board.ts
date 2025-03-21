
import { Cell } from './cell';
import { Util } from './util';
import { Elements } from './util';
import { Puzzle } from '../models/puzzles';

type Cells = Map<number,Cell>;

export class Board {
    private _boardSize: number = 0;
    private _blockSize: number = 0;
    private _needEval: boolean = false;
    private _setupDone: boolean = false;
    private _cells:Cells = new Map([]);

    public constructor (puz: Puzzle) {
        this._boardSize = puz.size;
        
        switch (this._boardSize) {
            case 9: this._blockSize = 3; break;
            case 16: this._blockSize = 4; break;
            default:                
                console.log("Invalid boardSize!");
            break;
        }
        for (let j: number = 0; j < puz.size; j++) {
            for (let k: number = 0; k < puz.size; k++) {
                let cell:Cell = new Cell();
                cell.populatePossNums(puz.size);
                this._cells.set(this.getCellNum(j, k), cell);
            }
        }
        for (let y = 0; y < puz.size; y++) {
                for (let x = 0; x < puz.size; x++) {
                    if (puz.board[y][x] > 0) {
                        this.setCellKnown(x,y,puz.board[y][x]);
                    }
                }
        }
    }

    // determine index of cell by x & y
    private getCellNum(x: number, y: number): number {
        return (x * this._boardSize) + y;
    }

    private getCell(x: number, y: number): Cell {
        // Tell TS we guarantee grabbing a Cell instance from Map with "as Cell"
        // We may have to reevaluate own Map implementation to make TS happy
        // Perhaps an Array<Cell>[] ?
        return this._cells.get(this.getCellNum(x, y)) as Cell;
    }

    public setCellKnown(x: number, y: number, known: number): void {
        let cell:Cell = this.getCell(x, y);
        cell.knownNum = known;
        this.needEval = true;
        // Only display choice when Scanning starts
        if (this.setupDone === true) {
            Util.appendText(Elements.scanText, `Set cell (${x},${y}) to ${known}`);
        }

        this.clearColumn(x, known);
        this.clearRow(y, known);
        this.clearBlock(x, y, known);
    }

    private clearColumn(x: number, known: number): void {
        // Clear all the possible numbers vertically of "known"
        for (let j: number = 0; j < this._boardSize; j++) {
            this.getCell(x, j).removePossNum(known);
        }
    }

    private clearRow(y:number, known: number): void {
        // Clear all the possible numbers horizontally of "known"
        for (let j: number = 0; j < this._boardSize; j++) {
            this.getCell(j, y).removePossNum(known);
        }
    }

    private clearBlock(x: number, y: number, known: number): void {
        let blockStartX: number = Math.floor(x / this._blockSize) * this._blockSize;
        let blockStartY: number = Math.floor(y / this._blockSize) * this._blockSize;

        // Clear all the possible numbers within Block for Known
        for (let j: number = blockStartX; j < (blockStartX + this._blockSize); j++) {
            for (let k: number = blockStartY; k < (blockStartY + this._blockSize); k++) {
                this.getCell(j, k).removePossNum(known);
            }
        }
    }

    // Static Methods

    // Return true if board changed and needs to be reevaluated
    private static processBoardOnePossible(board: Board): boolean {
        // Go through each Cell and if there is only one possibility left, that is the Known number
        for (let j: number = 0; j < board.boardSize; j++) {
            for (let k: number = 0; k < board.boardSize; k++) {
                let known:number = board.getCell(j, k).onePossNumLeft();
                if (known > 0) {
                    board.setCellKnown(j, k, known);
                    return true;
                }
            }
        }
        return false;
    }

    // Return true if board changed and needs to be reevaluated
    private static processBoardBlockSingleNumber(board: Board): boolean {
        let blockX, blockY, maxBlockX, maxBlockY : number;
        maxBlockX = board.boardSize / board.blockSize;
        maxBlockY = board.boardSize / board.blockSize;

        for (let j: number = 0; j < maxBlockX; j++) {
            for (let k: number = 0; k < maxBlockY; k++) {
                // Start block checks
                let numMap:Map<number,number[][]> = new Map();
                // numMap[1...N]   -  does NOT start at 0
                for (let n: number = 1; n <= board.boardSize; n++) { numMap.set(n,[]); }
                
                for (let x: number = j * maxBlockX; x < j * maxBlockX + maxBlockX; x++) {
                    for (let y: number = k * maxBlockY; y < k * maxBlockY + maxBlockY; y++) {
                        if (board.getCell(x, y).knownNum === 0) {
                            let possNums:Array<number> = board.getCell(x, y).getPossNums();
                            // Add x,y Cell coordinates to map of numbers
                            possNums.forEach(num => { 
                                                    // Guarantee we can grab an array of arrays [x,y] from Map (could be empty [])
                                                    //let a:number[][] = numMap.get(num) as number[][];
                                                    let a:number[][] = numMap.get(num) ?? [];
                                                    a.push([x,y]);
                                                    numMap.set(num,a);
                                                    });
                        }
                    }
                }
                // Process array to find the only Cell with a possible number
                // Need to figure out nicer way to do iterate numMap.forEach
                for (let num: number = 1; num <= board.boardSize; num++) {
                    // Guarantee we can grab an array of arrays [x,y] from Map (could be empty [])
                    //let a:number[][] = numMap.get(num) as number[][];
                    let a:number[][] = numMap.get(num) ?? [];
                    if (a.length === 1) {
                        board.setCellKnown(a[0][0], a[0][1], num);
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public static processBoardStep(board: Board): void {
        board.needEval = false;
        Util.appendText(Elements.scanText, "Scanner #1 try")
        if (Board.processBoardBlockSingleNumber(board)) return;
        Util.appendText(Elements.scanText, "Scanner #2 try")
        if (Board.processBoardOnePossible(board)) return;
    }

    public static printBoard(board: Board, text: HTMLTextAreaElement) {
        let cell: Cell;
        let width: number = board.boardSize > 9 ? 2 : 1;
        let numStr: string;
        let size = board.boardSize;

        for (let y: number = 0; y < size; y++) {
            let a: Array<string> = [];
            for (let x: number = 0; x < size; x++) {
                cell = board.getCell(x, y);
                if (cell.knownNum > 0) {
                    numStr = cell.knownNum.toString();
                    a.push(`[${numStr.padStart(width)}]`);
                }
                else {
                    a.push(`[${" ".repeat(width)}]`);
                }
            }
            Util.appendText(text, a.join(""));
        }
    }

    public get boardSize() { return this._boardSize; }
    private set boardSize(size: number) { this._boardSize = size; }

    public get blockSize() { return this._blockSize; }
    private set blockSize(size: number) { this._blockSize = size; }

    public get setupDone() { return this._setupDone; }
    public set setupDone(modified: boolean) { this._setupDone = modified; }

    public get needEval() { return this._needEval; }
    private set needEval(modified: boolean) { this._needEval = modified; }
}
