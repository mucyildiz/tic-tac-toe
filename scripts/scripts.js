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

    const updateGameBoard = () => {
        // let targetCell = gameContainer.childNodes[index + 1];
        //this.innerHTML = marker;
        //console.log('active');
        this.style.backgroundColor = 'red';
        console.log('ac')
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

    const isMarker = (index, marker) => {
        return gameboard[index] == marker;
    }

    const horizontalVictory = (marker) => {
        return ((isMarker(0, marker) && isMarker(1, marker) && isMarker(2, marker)) || 
        (isMarker(3, marker) && isMarker(4, marker) && isMarker(5, marker)) || 
        (isMarker(6, marker) && isMarker(7, marker) && isMarker(8, marker))
        )
    }

    const checkVictory = (marker) => {
        console.log(horizontalVictory(marker));
    }

    return{checkVictory}
};


me = Player('yes', 'X');
