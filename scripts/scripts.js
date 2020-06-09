const GameBoard = (function() {
    let gameContainer = document.querySelector('.game-container');
    let gameboard = [];
    for(let i=0; i<9; i++){
        gameboard.push('');
    }
    const render = () => {
        // take in contents gameboard and return it 9 divs
        for(marker of gameboard){
            let cell = document.createElement('div');
            cell.className = 'cell';
            cell.innerHTML = marker;
            gameContainer.appendChild(cell);
        }

    }

    const updateGameBoard = (index, marker) => {
        let targetCell = gameContainer.childNodes[index + 1];
        targetCell.innerHTML = marker;
    }

    return{
        render, updateGameBoard,
    }
})();

GameBoard.render();
GameBoard.updateGameBoard(4, 'x');
GameBoard.updateGameBoard(3, 'x');