
import { puzzleList } from '../models/puzzles';
import { Board } from './board';

export class Util {
    public static appendText(textArea: HTMLTextAreaElement, str:string) : void {
        textArea.value += (str + "\n");
   }
   
}

export class Game {
    public static board: Board;
}

export class Elements {
    public static origText = document.getElementById("OriginalPuzzle") as HTMLTextAreaElement;
    public static scanText = document.getElementById("ScannedPuzzle") as HTMLTextAreaElement;
    
    public static scanButton = document.getElementById("scan") as HTMLButtonElement;
    public static puzzleSelect = document.getElementById("puzzles") as HTMLSelectElement;
}

