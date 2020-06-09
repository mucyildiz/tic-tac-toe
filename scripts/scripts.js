const Formatter = (function() {
    const log = (message) => console.log(message);


    const makeUpperCase = (text) => {
        log('hi');
        return text.toUpperCase();
    };

    return {
        makeUpperCase,
    }
})()
console.log(Formatter.makeUpperCase('hi'));

const GameBoard = (function() {
    let gameboard = [];
    for(let i=0; i<9; i++){
        gameboard.push('');
    }
    const render = () => {
        // take in contents gameboard and return it as a 3 by 3 grid 
    }

    const updateGameBoard = (index, marker) => {
        gameboard[index] = marker;
    }

    return{
        render,
    }
})();

GameBoard.accessKeyBoard();