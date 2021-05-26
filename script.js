const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    return {board};
})();

const player = (sign) => {
    return {sign}
}

const displayController = (() => {
    const playerO = player ('O'); 
    const playerX = player ('X'); 
    const buttons = document.querySelectorAll('.field');
    const winnerMessage = document.querySelector('.winner');

    let changeTurn = true;
    let gameWon = false;
    let round = 0;

    const renderBoard = board => {
        for (let i = 0; i < board.length; i++) {
            buttons[i].textContent = board[i];
        }
    };

    const markField = board => {
        for (let i = 0; i < board.length; i++) {
            buttons[i].addEventListener('click', () => {
                if (buttons[i].textContent || gameWon === true) return;
                if (changeTurn === true) {
                    buttons[i].textContent = playerO.sign;
                    board[i] = playerO.sign;
                    changeTurn = !changeTurn;
                }
                else {
                    buttons[i].textContent = playerX.sign;
                    board[i] = playerX.sign;
                    changeTurn = !changeTurn;
                }
                round++;
                if (round >= 5) {
                    checkWinner(board);
                }
            })
        } 
    }

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = board => {
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') continue;
            if (a === b && b === c) {
                gameWon = true;
                break;
            }
        }

        if (gameWon) {
            if (changeTurn === false) {
                winnerMessage.textContent = 'Player O Wins!';
                winnerMessage.style.paddingBottom = '50px';
                return;
            }
            winnerMessage.textContent = 'Player X Wins!';
            winnerMessage.style.paddingBottom = '50px';
            return;
        }
        else if (round === 9) {
            winnerMessage.textContent = 'Draw!';
            winnerMessage.style.paddingBottom = '50px';
            return;
        }
    };

    const resetButton = document.querySelector('.reset');
    resetButton.addEventListener('click', () => {
        for (let i = 0; i < gameBoard.board.length; i++) {
            gameBoard.board[i] = '';
        }
        renderBoard(gameBoard.board);
        gameWon = false;
        round = 0;
        winnerMessage.textContent = null;
        winnerMessage.style.paddingBottom = null;
    });

    return {markField}
})();

displayController.markField(gameBoard.board);