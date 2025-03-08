
export const origText = document.getElementById("OriginalPuzzle") as HTMLTextAreaElement;
export const scanText = document.getElementById("ScannedPuzzle") as HTMLTextAreaElement;

export class Util {
    public static appendText(textArea: HTMLTextAreaElement, str:string) : void {
        textArea.value += (str + "\n");
   }
}

export type Puzzle = {
    name: string;
    label: string;
    size: number;
    board: number[][];
    };

export interface PuzzleData {
    puzzleList: Puzzle[];
}
