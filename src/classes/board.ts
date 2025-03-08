
import { Cell } from './cell';
import { Util } from './util';

import { origText } from './util';
import { scanText } from './util';

type Cells = Map<number,Cell>; 

export class Board {
    private _boardSize: number = 0;
    private _blockSize: number = 0;
    private _needEval: boolean = false;
    private _setupDone: boolean = false;

    private _cells:Cells = new Map([]);

    public constructor (size: number) {
        this._boardSize = size;

        switch (this._boardSize) {
            case 9: this._blockSize = 3; break;
            case 16: this._blockSize = 4; break;
            default:                
                console.log("Invalid boardSize!");
            break;
        }
        
        for (let j: number = 0; j < size; j++) {
            for (let k: number = 0; k < size; k++) {
                let cell:Cell = new Cell();
                cell.populatePossNums(size);
                this._cells.set(this.getCellNum(j, k), cell);
            }
        }
    }

    // determine index of cell by x & y
    private getCellNum(x: number, y: number): number {
        return (x * this._boardSize) + y;
    }

    private getCell(x: number, y: number): Cell {
        // Guarantee we can grab a Cell instance from Map with !
        // may have to reevaluate own Map implementation to make TS happy
        // Maybe an Array<Cell>[] ?
        return this._cells.get(this.getCellNum(x, y))!;
    }

    public setCellKnown(x: number, y: number, known: number): void {
        let cell: Cell = this.getCell(x, y);
        cell.knownNum = known;
        this.needEval = true;
        // Only display choice when Scanning starts
        if (this.setupDone === true) {
            Util.appendText(scanText, "Set cell ("+x+","+y+") to "+known);
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
                if ((j !== x) || (k !== y)) {
                    this.getCell(j, k).removePossNum(known);
                }
            }
        }
    }

    // Return true if board changed and needs to be reevaluated
    private processBoardOnePossible(): boolean {
        // Go through each Cell and if there is only one possibility left, that is the Known number
        for (let j: number = 0; j < this._boardSize; j++) {
            for (let k: number = 0; k < this._boardSize; k++) {
                let known:number = this.getCell(j, k).onePossNumLeft();
                if (known > 0) {
                    this.setCellKnown(j, k, known);
                    return true;
                }
            }
        }
        return false;
    }

    // Return true if board changed and needs to be reevaluated
    private processBoardBlockSingleNumber(): boolean {
        let blockX, blockY, maxBlockX, maxBlockY : number;
        maxBlockX = this._boardSize / this._blockSize;
        maxBlockY = this._boardSize / this._blockSize;

        for (let j: number = 0; j < maxBlockX; j++) {
            for (let k: number = 0; k < maxBlockY; k++) {
                // Start block checks
                let numMap:Map<number,number[][]> = new Map();
                // numMap[1...N]   -  does NOT start at 0
                for (let n: number = 1; n <= this._boardSize; n++) { numMap.set(n,[]); }
                
                for (let x: number = j * maxBlockX; x < j * maxBlockX + maxBlockX; x++) {
                    for (let y: number = k * maxBlockY; y < k * maxBlockY + maxBlockY; y++) {
                        if (this.getCell(x, y).knownNum === 0) {
                            let possNums:Array<number> = this.getCell(x, y).getPossNums();
                            // Add x,y Cell coordinates to map of numbers
                            possNums.forEach(num => { 
                            // Guarantee we can grab an array from Map with !
                            let a:number[][] = numMap.get(num)!;
                            a.push([x,y]);
                            numMap.set(num,a);
                            });
                        }
                    }
                }
                // Process array to find the only Cell with a possible number
                // Need to figure out nicer way to do iterate numMap.forEach
                for (let n: number = 1; n <= this._boardSize; n++) {
                    // Guarantee we can grab an array from Map with !
                    let a:number[][] = numMap.get(n)!;
                    if (a.length === 1) {
                        this.setCellKnown(a[0][0], a[0][1], n);
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public processBoardStep(): void {
        this.needEval = false;
        Util.appendText(scanText, "Scanner #1 try")
        if (this.processBoardBlockSingleNumber()) return;
        Util.appendText(scanText, "Scanner #2 try")
        if (this.processBoardOnePossible()) return;
    }

    public printBoard(text: HTMLTextAreaElement) {
        let cell: Cell;
        let width: number = this._boardSize > 9 ? 2 : 1;
        let numStr: string;
        
        for (let y: number = 0; y < this._boardSize; y++) {
            let a: Array<string> = [];
            for (let x: number = 0; x < this._boardSize; x++) {
                cell = this.getCell(x, y);
                if (cell.knownNum > 0) {
                    numStr = cell.knownNum.toString();
                    a.push("[" + " ".repeat(width - numStr.length) + numStr + "]");
                }
                else {
                    a.push("[" + " ".repeat(width) + "]");
                }
            }
            Util.appendText(text, a.join(""));
        }
    }

    public get setupDone() { return this._setupDone; }
    public set setupDone(modified: boolean) { this._setupDone = modified; }
    public get needEval() { return this._needEval; }
    private set needEval(modified: boolean) { this._needEval = modified; }
}
