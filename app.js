document.addEventListener('DOMContentLoaded', () => {
    const sizeInput = document.getElementById('board-size');
    const speedInput = document.getElementById('speed');
    const speedValue = document.getElementById('speed-value');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');

    function updateSpeedValue() {
        speedValue.textContent = speedInput.value;
    }

    function visualizeNQueens() {
        const size = parseInt(sizeInput.value, 10);
        const delay = parseInt(speedInput.value, 10);

        if (size < 4 || size > 20) {
            alert('Please enter a board size between 4 and 20.');
            return;
        }

        createBoard(size);
        const solutions = solveNQueens(size);

        if (solutions.length > 0) {
            placeQueensWithDelay(size, solutions[0], delay);
        } else {
            console.log('No solutions found.');
        }
    }

    function resetBoard() {
        const size = parseInt(sizeInput.value, 10);
        createBoard(size);
    }

    startBtn.addEventListener('click', visualizeNQueens);
    resetBtn.addEventListener('click', resetBoard);
    speedInput.addEventListener('input', updateSpeedValue);

    // Initialize default speed value
    updateSpeedValue();
});

function createBoard(size) {
    const boardElement = document.getElementById('board');
    boardElement.style.gridTemplateColumns = `repeat(${size}, 50px)`;
    boardElement.innerHTML = ''; // Clear any existing squares

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const square = document.createElement('div');
            square.classList.add('square');
            if ((row + col) % 2 === 0) {
                square.classList.add('light');
            } else {
                square.classList.add('dark');
            }
            square.dataset.row = row;
            square.dataset.col = col;
            boardElement.appendChild(square);
        }
    }
}

function solveNQueens(size) {
    const solutions = [];
    solve(size, 0, [], solutions);
    return solutions;
}

function solve(n, row, queens, solutions) {
    if (row === n) {
        solutions.push(queens.slice());
        return;
    }
    for (let col = 0; col < n; col++) {
        if (isValid(queens, row, col)) {
            queens.push(col);
            solve(n, row + 1, queens, solutions);
            queens.pop();
        }
    }
}

function isValid(queens, row, col) {
    for (let r = 0; r < row; r++) {
        const c = queens[r];
        if (c === col || r - c === row - col || r + c === row + col) {
            return false;
        }
    }
    return true;
}

function placeQueensWithDelay(size, solution, delay) {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = ''; // Clear any existing queens

    createBoard(size); // Recreate the board

    for (let row = 0; row < size; row++) {
        const col = solution[row];
        setTimeout(() => {
            const square = boardElement.querySelector(`.square[data-row='${row}'][data-col='${col}']`);
            const queen = document.createElement('div');
            queen.classList.add('queen');
            queen.textContent = '♕';
            square.appendChild(queen);
        }, row * delay);
    }
}
