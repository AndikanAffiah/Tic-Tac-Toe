const startGame = () => {
    const ticTacToe = {

        players: [1, 2],
        playerChoice: 1,

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
        }        
    }
    
    const cells = [];
    
    for(let i = 1; i <= 9; i++){
        cells[i] = document.getElementById(i);
        
        cells[i].addEventListener('dblclick' || 'click', () => {
            ticTacToe.updateGame(ticTacToe.playerChoice, i);
        });
    }
}
