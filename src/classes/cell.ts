
// Possible Numbers, true means possible for index+1
type PossNums = Array<boolean>;

export class Cell {
    private _knownNum: number = 0;
    private _possNumsArray: PossNums = [];

    public populatePossNums(maxNum: number): void {
        for (let j: number = 1; j <= maxNum; j++) {
            this._possNumsArray.push(true);
        }
    }

    public clearPossNums(): void {
        this._possNumsArray.fill(false);
    }
    
    public hasPossNum(num:number): boolean {
        return this._possNumsArray[num-1];
    }

    // This is getting the actual numbers (index+1), not boolean flags
    public getPossNums(): Array<number> {
        let poss: Array<number> = [];
        for (let num:number = 0; num < this._possNumsArray.length; num++) {
            if (this._possNumsArray[num] === true) {
                poss.push(num+1);
            }
        }
        return poss;
    }

    public onePossNumLeft(): number {
        let poss: Array<number> = [];
        for (let num:number = 0; num < this._possNumsArray.length; num++) {
            if (this._possNumsArray[num] === true) {
                poss.push(num+1);
            }
        }
        if (poss.length === 1) {
            return poss[0];
        }
        // Can never have a value of 0, so this is treated as false
        return 0;
    }

    public removePossNum(num:number): void {
        this._possNumsArray[num-1] = false;
    }

    public get knownNum() { return this._knownNum; }

    // When we know the number, clear the possible numbers
    public set knownNum(num: number) {
        this._knownNum = num;
        this.clearPossNums();
    }

}

