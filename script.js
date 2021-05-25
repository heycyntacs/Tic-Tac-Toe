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
                if (buttons[i].textContent) return;
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

        function checkWinner (board) {
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
                if (round === 9 && (a !== b && b !== c)) {
                    alert('Draw');
                    resetBoard(board);
                    return;
                }
            }

            if (gameWon) {
                alert('Victory');
                resetBoard(board);
                return;
            }
        }

        function resetBoard (board) {
            for (let i = 0; i < board.length; i++) {
                board[i] = '';
                buttons[i].textContent = board[i];
            }
            gameWon = false;
            round = 0;
        }

    return {renderBoard, markField}
})();

const gameController = (() => {
    displayController.renderBoard(gameBoard.board);
    displayController.markField(gameBoard.board);
})();