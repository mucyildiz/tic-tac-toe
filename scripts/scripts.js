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
    const numWins = 0;


    return{getName, getMarker, numWins};
    
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
            currPlayer.numWins++;
            let wins = document.querySelector('.' + currPlayer.getMarker() + 'wins');
            wins.innerHTML = currPlayer.numWins;
            gameOver(currPlayer);
            console.log(currPlayer.getName() + ' is win.' + currPlayer.numWins);
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
    
    const gameOver = (player) => {
        let gameOver = document.querySelector('.game-over');
        let text = document.querySelector('.winner-text');
        gameOver.style.display = 'block';
        text.innerHTML = player.getName() + ' has won.'
        let playAgain = document.querySelector('.play-again')
        playAgain.addEventListener('click', reset);
        let exit = document.querySelector('.exit')
        exit.addEventListener('click', () => {
            gameOver.style.display = 'none';
        })
    }

    const reset = () => {
        let gameOver = document.querySelector('.game-over');
        for(cell of gameboard){
            cell.innerHTML = '';
        }
        gameOver.style.display = 'none';
    }

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
    let game = document.querySelector('.game-container');
    game.style.display = 'grid';

    let playerOneDisplay = document.querySelector('.one');
    let playerTwoDisplay = document.querySelector('.two');
    playerOneDisplay.innerHTML = playerOne.getName() + ': ' + playerOne.getMarker();
    playerTwoDisplay.innerHTML = playerTwo.getName() + ': ' + playerTwo.getMarker();

    const attachWins = (player, display) => {
        let winTracker = document.createElement('div');
        winTracker.className = player.getMarker() + 'wins';
        winTracker.innerHTML = player.numWins;
        display.appendChild(winTracker);
    }

    attachWins(playerOne, playerOneDisplay);
    attachWins(playerTwo, playerTwoDisplay);
}

