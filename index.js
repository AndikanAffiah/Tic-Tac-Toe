const startGame = () => {  
    const players = [1,2];
    let currentPlayer = players[0];

    const winGameArray = [
        [1, 2, 3],
        [1, 4, 7],
        [1, 5, 9],
        [2, 5, 8],
        [3, 5, 7],
        [3, 6, 9],
        [4, 5, 6],
        [7, 8, 9]
    ];
    const gameState = {
        cells: [],
        canUpdate: true,
        updateCell: function (cellToUpdate, player) {
            if(this.cells[cellToUpdate] < 1 && this.canUpdate){
                this.cells[cellToUpdate] = player;
                updateBoard(this.emitStateData());
                setTimeout(()=>{
                    checkWinner(this.emitStateData()); 
                }, 400);
                changePlayer();
            }
        },
        emitStateData: function () {
            return this.cells;
        },
        resetGameData: function () {
            this.cells = this.cells.map(x => x = 0);
            updateBoard(this.emitStateData());
            this.canUpdate = true;
            currentPlayer = players[0];
        }
    };
    const generateGameStateCellData = () => {
        for (let i = 1; i <= 9; i++) {
            gameState.cells[i] = 0; 
        }
    };
    const display = document.getElementById('display');
    display.addEventListener('click', (e) => {
        if (e.target.id.length == 1) {
            gameState.updateCell(Number(e.target.id), currentPlayer);
        }
    });
    const updateBoard = (data) => {
        for (let i = 1; i < data.length; i++) {
            if(data[i] != 0){
                if(data[i] == 1){
                    document.getElementById(i).innerText = 'X';
                }else if(data[i] == 2){
                    document.getElementById(i).innerText = 'O'
                }
            }else{
                document.getElementById(i).innerText = '';
            }
        }
    };
    const changePlayer = () => {
        if(currentPlayer == players[0]){
            currentPlayer = players[1];
        }else{
            currentPlayer = players[0];
        }
    }
    const checkWinner = (data) => {
        winGameArray.forEach((elem) => {
            if(data[elem[0]] == data[elem[1]] && data[elem[1]] == data[elem[2]] && (data[elem[2]] == 1 || data[elem[2]] == 2)){
                gameState.canUpdate = false;
                if(data[elem[0]] == 1){
                    alert('Player X has won!!!');
                }else{
                    alert('Player O has won');
                }
            }
        })
    }
    const reset = document.getElementById('resetButton');
    reset.addEventListener('click', ()=>{
        gameState.resetGameData();
    });
    generateGameStateCellData();
}