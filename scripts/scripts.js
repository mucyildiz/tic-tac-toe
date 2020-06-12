const GameBoard = (function() {
    let gameContainer = document.querySelector('.game-container');

    for(let i=0; i<9; i++){
        let cell = document.createElement('div');
        cell.className = 'cell';
        gameContainer.appendChild(cell);
    }
    let gameArray = Array.from(gameContainer.children);

    // when a turn is made, this function adds the marker of the player to the board
    const updateGameBoard = (index, addedMarker) => {
        if(gameArray[index].innerHTML == ''){
            gameArray[index].innerHTML = addedMarker;
        }
    }

    return{
        gameArray, updateGameBoard
    }
})();

const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;



    return{getName, getMarker}
    
};

const GameFlow = (playerOne, playerTwo) => {
    let turnTracker = 0;
    let gameboard = GameBoard.gameArray;

    const isMarker = (indexOne, indexTwo, indexThree, marker) => {
        return gameboard[indexOne].innerHTML == marker && gameboard[indexTwo].innerHTML == marker && gameboard[indexThree].innerHTML == marker;
    }
    const horizontalVictory = (marker) => {
        return (isMarker(0, 1, 2, marker) || isMarker(3, 4, 5, marker) || isMarker(6, 7, 8, marker))
    }
    const verticalVictory = (marker) => {
        return (isMarker(0, 3, 6, marker) || isMarker(1, 4, 7, marker) || isMarker(2, 5, 8, marker));
    }
    const diagonalVictory = (marker) => {
        return (isMarker(0, 4, 8, marker) || isMarker(2, 4, 6, marker));
    }

    const boardFull = () => {
        for(cell of gameboard){
            if(cell.innerHTML == ''){
                return false;
            }
        }
        return true;
    }

    const checkVictory = (marker) => {
        let victoryCheck = horizontalVictory(marker) || verticalVictory(marker) || diagonalVictory(marker);
        return victoryCheck;
    }


    const makePlay = (index, currPlayer) => {
        GameBoard.updateGameBoard(index, currPlayer.getMarker());
        if(checkVictory(currPlayer.getMarker()) == true){
            console.log(currPlayer.getName() + ' is win.');
        }
        else if(boardFull() == true && checkVictory(currPlayer.getMarker()) == false){
            console.log('tie');
        }
    }

    gameboard.forEach(cell => cell.addEventListener('click', (e) => {
        let index = gameboard.indexOf(e.target);
        if(turnTracker == 0 && e.target.innerHTML == ''){
            player = playerOne;
            turnTracker = 1;
        }
        else if(turnTracker == 1 && e.target.innerHTML == ''){
            player = playerTwo;
            turnTracker = 0;
        }
        makePlay(index, player);
    }))
    

    return{checkVictory, makePlay}
};


const startGame = () => {
    let playerOneName = document.querySelector('[name="playerOne"]').value;
    let playerTwoName = document.querySelector('[name="playerTwo"]').value;
    let playerOne = Player(playerOneName, 'X');
    let playerTwo = Player(playerTwoName, 'O');
    gameflow = GameFlow(playerOne, playerTwo);
    let form = document.querySelector('.player-info');
    form.style.display = 'none';

}