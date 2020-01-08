const startGame = () => {
    const ticTacToe = {

        players: [1, 2],
        playerChoice: 1,

        undoRedoArray: [
            [], //undo array
            [] //redo array
        ],
        timesUndone: 0,

        winGameArray: [
            [1, 2, 3],
            [1, 4, 7],
            [1, 5, 9],
            [2, 5, 8],
            [3, 5, 7],
            [3, 6, 9],
            [4, 5, 6],
            [7, 8, 9]
        ],
        gameState: {
            data: [0,0,0,0,0,0,0,0,0,0],
            mutate(choice, cell) {
                if (this.data[cell] == 0){
                    if (choice == 1) {
                        this.data[cell] = 1;
                    } else {
                        this.data[cell] = 2;
                    }
                }
            },
            replace(cell) {
                this.data[cell] = 0;
            }
        },
        
        updateGame(choice, cell) {
            this.gameState.mutate(choice, cell);
            this.undoRedoArray[0].push([choice, cell]);
            this.displayState();
            
            if (choice == this.players[0]){
                this.playerChoice = this.players[1];
            }else{
                this.playerChoice = this.players[0];
            }            
            
            setTimeout(() => {
                this.checkWinner();
            }, 400);
        },
        
        displayState() {
            for (let i = 1; i <= 9; i++) {
                if(this.gameState.data[i] == 0){
                    cells[i].innerHTML = "";
                } else if (this.gameState.data[i] == 1){
                    cells[i].innerHTML = "X";
                } else {
                    cells[i].innerHTML = "O";                    
                }
            }
        },
        
        checkWinner() {
            for (let i = 0; i < this.winGameArray.length; i++) {
                
                let a = this.gameState.data[this.winGameArray[i][0]];
                let b = this.gameState.data[this.winGameArray[i][1]];
                let c = this.gameState.data[this.winGameArray[i][2]];
                
                if(a == b && b == c && (c == 1 || c == 2)){
                    alert("You have won");
                }
                
            }
        },
        
        undoRedo(action) {
            if(action == "undo"){
                
                if (this.undoRedoArray[0].length > 1){
                    let value = this.undoRedoArray[0].splice(this.undoRedoArray[0].length - 2, 2);
                    this.gameState.replace(value[1][1]);
                    
                    this.undoRedoArray[1].push([...value[1]]);
                    this.updateGame(...value[0]);
                    
                    this.timesUndone += 1;
                }
            }else if(action == "redo"){
                if (this.undoRedoArray[1].length > 0){
                    let value = this.undoRedoArray[1].splice(this.undoRedoArray[1].length - 1, 1);
                    this.gameState.replace(value[0][1]);
                    this.updateGame(...value[0], );
                }
            }
        }
        
    }
    
    const cells = [];
    
    for(let i = 1; i <= 9; i++){
        cells[i] = document.getElementById(i);
        
        cells[i].addEventListener('dblclick' || 'click', () => {
            ticTacToe.updateGame(ticTacToe.playerChoice, i);
            if (ticTacToe.undoRedoArray[1] > 1 && ticTacToe.timesUndone > 0){
                ticTacToe.undoRedoArray[1].splice(ticTacToe.undoRedoArray[1].length - ticTacToe.timesUndone, ticTacToe.timesUndone);
            }
        });
    }  
    
    const undoButton = document.getElementById("undo");
    const redoButton = document.getElementById("redo");
    
    undoButton.addEventListener('click', () => {
        ticTacToe.undoRedo("undo");
    });
    redoButton.addEventListener('click', () => {
        ticTacToe.undoRedo("redo");
    });
}
