function copyMat(mat) {
    var newMat = [];
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = [];
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j];
        }
    }
    return newMat;
}




function countBombs(cellI, cellJ, mat) {
    var bombsSum = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].isMine) bombsSum++;
        }
    }
    return bombsSum;
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


// function UpdateWithBombs(board) {
//     var newBoard = copyMat(board);
//     for (var i = 0; i < board.length; i++) {
//         for (var j = 0; j < board[0].length; j++) {   

//             newBoard[i][j] ={
//                 isMine : (Math.random() > 0.8) ? true : false,
//                 isFirst : false
//             } 
//         }
        
//     }

//     return newBoard;
// }


function ModalFinal(board) {
    var newBoard = copyMat(board);
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var NumOfBombs = countBombs(i, j, board);
            if ((NumOfBombs > 2) && (NumOfBombs < 6)) {
                if (board[i][j] === '') newBoard[i][j] = LIFE;
            }
            else if (board[i][j] === LIFE) newBoard[i][j] = '';

        }
    }
    return newBoard;
}



function cellClicked(elCell, cellI, cellJ) {
  
    if (gBoard[cellI][cellJ]) {
        //update the model:
        gBoard[cellI][cellJ] = SUPER_LIFE
        //update dom:
        elCell.innerText = gBoard[cellI][cellJ]

        blowUpNegs(cellI, cellJ, gBoard)
    }
}


function renderCell(i, j, value) {
    var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
    elCell.innerText = value
}


