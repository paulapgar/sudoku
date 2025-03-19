(()=>{"use strict";class e{constructor(){this._knownNum=0,this._possNums=new Map([])}populatePossNums(e){for(let t=1;t<=e;t++)this._possNums.set(t,!0)}clearPossNums(){this._possNums.clear()}hasPossNum(e){return this._possNums.has(e)}getPossNums(){return Array.from(this._possNums.keys())}onePossNumLeft(){return 1===this._possNums.size?Array.from(this._possNums.keys())[0]:0}removePossNum(e){this._possNums.delete(e)}get knownNum(){return this._knownNum}set knownNum(e){this._knownNum=e,this._possNums.clear()}}class t{static appendText(e,t){e.value+=t+"\n"}}class s{}class o{}o.origText=document.getElementById("OriginalPuzzle"),o.scanText=document.getElementById("ScannedPuzzle"),o.scanButton=document.getElementById("scan"),o.puzzleSelect=document.getElementById("puzzles");class l{constructor(t){switch(this._boardSize=0,this._blockSize=0,this._needEval=!1,this._setupDone=!1,this._cells=new Map([]),this._boardSize=t.size,this._boardSize){case 9:this._blockSize=3;break;case 16:this._blockSize=4;break;default:console.log("Invalid boardSize!")}for(let s=0;s<t.size;s++)for(let o=0;o<t.size;o++){let l=new e;l.populatePossNums(t.size),this._cells.set(this.getCellNum(s,o),l)}for(let e=0;e<t.size;e++)for(let s=0;s<t.size;s++)t.board[e][s]>0&&this.setCellKnown(s,e,t.board[e][s])}getCellNum(e,t){return e*this._boardSize+t}getCell(e,t){return this._cells.get(this.getCellNum(e,t))}setCellKnown(e,s,l){this.getCell(e,s).knownNum=l,this.needEval=!0,!0===this.setupDone&&t.appendText(o.scanText,`Set cell (${e},${s}) to ${l}`),this.clearColumn(e,l),this.clearRow(s,l),this.clearBlock(e,s,l)}clearColumn(e,t){for(let s=0;s<this._boardSize;s++)this.getCell(e,s).removePossNum(t)}clearRow(e,t){for(let s=0;s<this._boardSize;s++)this.getCell(s,e).removePossNum(t)}clearBlock(e,t,s){let o=Math.floor(e/this._blockSize)*this._blockSize,l=Math.floor(t/this._blockSize)*this._blockSize;for(let r=o;r<o+this._blockSize;r++)for(let o=l;o<l+this._blockSize;o++)r===e&&o===t||this.getCell(r,o).removePossNum(s)}processBoardOnePossible(){for(let e=0;e<this._boardSize;e++)for(let t=0;t<this._boardSize;t++){let s=this.getCell(e,t).onePossNumLeft();if(s>0)return this.setCellKnown(e,t,s),!0}return!1}processBoardBlockSingleNumber(){var e;let t,s;t=this._boardSize/this._blockSize,s=this._boardSize/this._blockSize;for(let o=0;o<t;o++)for(let l=0;l<s;l++){let r=new Map;for(let e=1;e<=this._boardSize;e++)r.set(e,[]);for(let e=o*t;e<o*t+t;e++)for(let t=l*s;t<l*s+s;t++)0===this.getCell(e,t).knownNum&&this.getCell(e,t).getPossNums().forEach((s=>{var o;let l=null!==(o=r.get(s))&&void 0!==o?o:[];l.push([e,t]),r.set(s,l)}));for(let t=1;t<=this._boardSize;t++){let s=null!==(e=r.get(t))&&void 0!==e?e:[];if(1===s.length)return this.setCellKnown(s[0][0],s[0][1],t),!0}}return!1}processBoardStep(){this.needEval=!1,t.appendText(o.scanText,"Scanner #1 try"),this.processBoardBlockSingleNumber()||(t.appendText(o.scanText,"Scanner #2 try"),this.processBoardOnePossible())}printBoard(e){let s,o,l=this._boardSize>9?2:1;for(let r=0;r<this._boardSize;r++){let a=[];for(let e=0;e<this._boardSize;e++)s=this.getCell(e,r),s.knownNum>0?(o=s.knownNum.toString(),a.push(`[${o.padStart(l)}]`)):a.push(`[${" ".repeat(l)}]`);t.appendText(e,a.join(""))}}get setupDone(){return this._setupDone}set setupDone(e){this._setupDone=e}get needEval(){return this._needEval}set needEval(e){this._needEval=e}}const r=[{name:"Puzzle1",label:"Puzzle #1 (Easy)",size:9,board:[[0,6,0,0,0,0,0,1,0],[1,0,0,2,0,0,7,0,3],[0,0,0,6,0,9,0,8,0],[0,7,5,0,0,0,9,0,0],[0,0,0,0,5,0,0,0,0],[0,0,2,0,0,0,5,4,0],[0,8,0,1,0,6,0,0,0],[5,0,3,0,0,2,0,0,8],[0,9,0,0,0,0,0,2,0]]},{name:"Puzzle38",label:"Puzzle #38 (Easy)",size:9,board:[[0,1,0,7,0,8,9,0,0],[3,0,0,0,0,9,0,8,0],[0,0,0,0,5,2,0,0,6],[8,0,0,0,7,0,2,4,9],[0,0,4,8,9,3,1,0,0],[9,5,7,0,4,0,0,0,3],[7,0,0,9,2,0,0,0,0],[0,6,0,3,0,0,0,0,2],[0,0,9,6,0,5,0,7,0]]},{name:"Puzzle88",label:"Puzzle #88 (Medium)",size:9,board:[[0,0,0,1,9,0,0,7,0],[0,0,8,0,0,0,0,0,3],[0,4,0,0,0,6,0,0,0],[9,0,0,0,1,0,6,0,0],[1,0,0,5,0,3,0,0,8],[0,0,4,0,7,0,0,0,2],[0,0,0,7,0,0,0,8,0],[6,0,0,0,0,0,7,0,0],[0,3,0,0,4,8,0,0,0]]},{name:"Puzzle94",label:"Puzzle #94 (Medium)",size:9,board:[[0,3,1,0,0,0,0,0,0],[7,0,8,0,2,0,0,0,1],[0,0,0,8,0,0,4,0,0],[0,7,0,0,3,6,0,0,0],[0,4,6,0,0,0,2,3,0],[0,0,0,5,7,0,0,4,0],[0,0,5,0,0,8,0,0,0],[6,0,0,0,5,0,1,0,2],[0,0,0,0,0,0,3,6,0]]},{name:"Puzzle174",label:"Puzzle #74 (Hard)",size:9,board:[[0,0,8,0,0,0,4,0,0],[0,0,0,4,0,5,0,0,0],[9,0,7,0,0,0,2,0,6],[0,6,0,0,3,0,0,7,0],[0,0,0,8,5,9,0,0,0],[0,8,0,0,7,0,0,1,0],[1,0,4,0,0,0,3,0,8],[0,0,0,2,0,3,0,0,0],[0,0,6,0,0,0,7,0,0]]},{name:"Puzzle245",label:"Puzzle #245 (Hard)",size:9,board:[[0,0,0,0,0,7,5,0,0],[5,0,0,3,0,0,0,0,0],[6,0,7,0,0,0,0,0,2],[0,0,2,0,0,3,7,0,0],[0,0,0,0,5,0,0,0,0],[0,0,3,4,0,0,8,0,0],[3,0,0,0,0,0,4,0,8],[0,0,0,0,0,4,0,0,9],[0,0,1,5,0,0,0,0,0]]},{name:"Puzzle16x16",label:"Puzzle 16x16 (Hard)",size:16,board:[[0,3,0,6,0,2,0,11,0,0,14,0,1,0,0,0],[16,0,0,14,0,0,0,0,8,0,0,0,0,15,0,0],[13,0,0,2,0,0,12,1,6,16,0,0,10,0,0,5],[0,0,10,0,9,0,5,0,1,3,2,0,0,16,0,6],[4,14,0,0,0,1,9,0,0,10,0,0,11,5,0,0],[11,2,12,0,13,0,0,5,0,14,0,0,0,0,6,9],[0,10,0,3,0,0,0,0,0,0,7,13,0,0,4,2],[0,0,16,0,7,0,3,0,0,0,6,2,13,0,15,0],[0,15,0,12,4,11,0,0,0,6,0,10,0,7,0,0],[9,11,0,0,6,5,0,0,0,0,0,0,4,0,12,0],[2,5,0,0,0,0,1,0,15,0,0,4,0,8,3,14],[0,0,4,1,0,0,8,0,0,2,13,0,0,0,10,16],[10,0,7,0,0,6,2,9,0,13,0,3,0,4,0,0],[5,0,0,11,0,0,13,3,2,4,0,0,14,0,0,10],[0,0,3,0,0,0,0,14,0,0,0,0,8,0,0,7],[0,0,0,4,0,16,0,0,12,0,8,0,15,0,1,0]]}];for(const e in r){const t=document.createElement("option");t.value=r[e].name,t.text=r[e].label,o.puzzleSelect.add(t)}o.scanButton.addEventListener("click",(function(){if(s.board&&!1!==s.board.setupDone&&s.board){o.scanText.value="";let e=-1;for(;!0===s.board.needEval;)s.board.processBoardStep(),e++;t.appendText(o.scanText,`Finished With Board  (${e} moves)`),s.board.printBoard(o.scanText),o.scanText.scrollTop=o.scanText.scrollHeight,s.board.setupDone=!1}})),o.puzzleSelect.addEventListener("change",(function(){if("Choose"!==o.puzzleSelect.value){for(const e in r)r[e].name===o.puzzleSelect.value&&(s.board=new l(r[e]));o.origText.value="",o.scanText.value="",t.appendText(o.origText,"Initial Board"),s.board.printBoard(o.origText),s.board.setupDone=!0}else o.origText.value="",o.scanText.value="",s.board.setupDone=!1}))})();