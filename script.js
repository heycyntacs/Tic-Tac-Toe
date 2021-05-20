const gameBoardObject = () => {
    let gameBoard = [];
    return {gameBoard};
}

const player = (sign) => {
    return {sign}
}

const changeTurn = (() => {
    const change = (turn) => turn = !turn;
    return {change};
})();

const player1 = player ('X');
const player2 = player ('O');

const game = gameBoardObject();
game.gameBoard.push('X', '1', '2', '3');
game.gameBoard.splice(1, 0, 2);
console.log(game.gameBoard);