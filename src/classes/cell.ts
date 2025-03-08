
// Possible Numbers, key is typically 1..N, use boolean to make Map to use its functions
type PossNums = Map<number,boolean>;

export class Cell {
    private _knownNum: number = 0;
    private _possNums: PossNums = new Map([]);

    public populatePossNums(maxNum: number): void {
        for (let j: number = 1; j <= maxNum; j++) {
            this._possNums.set(j, true);
        }
    }

    public clearPossNums(): void {
        this._possNums.clear();
    }
    
    public hasPossNum(num:number): boolean {
        return this._possNums.has(num);
    }
    
    public getPossNums(): Array<number> {
        return Array.from(this._possNums.keys());
    }

    public onePossNumLeft(): number {
        if (this._possNums.size === 1) {
            let keys:Array<number> = Array.from(this._possNums.keys());
            return keys[0];
        }
        // Can never have a value of 0, so this is treated as false
        return 0;
    }

    public removePossNum(num:number): void {
        if (this._possNums.delete(num) === false) {
            // we don't care about this for now, if ever, delete will ignore nonexistent keys
            // console.log("Remove possible num doesn't exist ("+num+")");
        } 
    }

    public get knownNum() { return this._knownNum; }

    // When we know the number, clear the possible numbers
    public set knownNum(num: number) {
        this._knownNum = num;
        this._possNums.clear();
    }

}

