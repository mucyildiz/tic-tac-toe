const GameBoard = (function() {
    let gameContainer = document.querySelector('.game-container');
    let gameboard = [];
    for(let i=0; i<9; i++){
        gameboard.push('');
    }


    for(marker of gameboard){
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerHTML = marker;
        gameContainer.appendChild(cell);
    }

    return{
        gameboard, gameContainer
    }
})();

const Player = (name, marker) => {
    let gameflow = GameFlow();
    const getName = () => name;
    const getMarker = () => marker;

    const makePlay = (e) => {
        if(e.target.innerHTML == ''){
            e.target.innerHTML = getMarker();
            for(i=0; i<GameBoard.gameContainer.children.length; i++){
                // set gameboard array to match contents of tic tac toe board whenever a move is made
                GameBoard.gameboard[i] = GameBoard.gameContainer.children[i].innerHTML;
            }
            gameflow.checkVictory(getMarker());
        }
    }

    let cells = Array.from(document.querySelectorAll('.cell'));
    cells.forEach(cell => cell.addEventListener('click', makePlay));

    let cellContentArray = [];

    return{getName, getMarker, makePlay}
    
};

const GameFlow = () => {
    //let playerOneMarker = playerOne.getMarker();
    //let playerTwoMarker = playerTwo.getMarker();
    let gameboard = Array.from(GameBoard.gameContainer.children);

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

    //to justify all these if statements to my future self: 
    //there's probably an algorithm for this but it would've taken longer to understand and implement
    //there's only eight winning conditions so it's easier to just hard code it with if statements
    const checkVictory = (marker) => {
        console.log(horizontalVictory(marker) || verticalVictory(marker) || diagonalVictory(marker));
    }


    return{checkVictory}
};


me = Player('yes', 'X');
