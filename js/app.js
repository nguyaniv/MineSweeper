
var gBoard;
var boardSize = 8
var BOMB = ''
var LIFE;
var lifeDOM = document.querySelector('.heart')
var gMines = 12



function init() {
    document.querySelector('.smile').innerHTML = '<img onclick="resetGame()" src="imgs/normal.png">'
    gBoard = createBoard()
    renderBoard(gBoard)
    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    }, false);
    LIFE = 3
    health()

}


function createBoard() {
    var board = []

    for (var i = 0; i < boardSize; i++) {
        board.push([])
        for (var j = 0; j < boardSize; j++) {
            board[i][j] = {
                isMine: false,
                isFirst: false
            }
        }
    }
    return board

}


function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board.length; j++) {
            var cell = `<td class =${i}-${j} data-i="${i}" data-j="${j}" onclick = "leftClick(this)"></td>`
            strHTML += cell
        }
    }
    strHTML += '</tr>'
    document.querySelector('.minSweeper').innerHTML = strHTML
}


function leftClick(el) {
    //update MODAL
    var newBoard = UpdateWithBombs(gBoard)
    var ele = el
    var eleI = ele.dataset.i;
    var eleJ = ele.dataset.j;

    newBoard[+eleI][+eleJ].isMine = false
    newBoard[+eleI][+eleJ].isFirst = true
    //update DOM
    renderBoardWithItems(newBoard)

    //    document.querySelector('.hidden first').classList.remove('hidden first')
    return el
}


// isMine:  (Math.random() > 0.9) ? true : false


function renderBoardWithItems(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board.length; j++) {
            var BombCount = countBombs(i, j, board) + ''
            if (board[i][j].isFirst) strHTML += `<td class ="hidden-first" onclick="removeHidden(this)"  oncontextmenu= "rightClick(this)"> ${BombCount}</td>`
            else if (board[i][j].isMine) strHTML += `<td  class = "bomb" onclick="showBomb(this)" oncontextmenu= "rightClick(this)">${BOMB}</td>`
            else strHTML += `<td class ="hidden" onclick="removeHidden(this),happy()" oncontextmenu= "rightClick(this)">${BombCount}</td>`

        }
    }
    strHTML += '</tr>'
    document.querySelector('.minSweeper').innerHTML = strHTML
}


function removeHidden(el) {
    el.classList.remove('hidden')

}


function showBomb(el) {
    el.innerHTML = '<img src="imgs/bomb.png">'
    LIFE--
    health()
    document.querySelector('.smile').innerHTML = '<img onclick="resetGame()" src="imgs/sad.png">'
    if (LIFE == 0) {
        gameOver()
    }
}

function gameOver() {

    var bombs = document.querySelectorAll(".bomb")
    for (var i = 0; i < bombs.length; i++) {
        bombs[i].innerHTML = '<img src="imgs/bomb.png">'
    }
    var hiddens = document.querySelectorAll(".hidden")
    for (var i = 0; i < hiddens.length; i++) {
        hiddens[i].classList.remove('hidden')
    }


}


function rightClick(el) {
    el.innerHTML = '<img src="imgs/flag.png">'
}

function resetGame() {
    init()
}



function happy() {
    document.querySelector('.smile').innerHTML = '<img onclick="resetGame()" src="imgs/happy.png">'

}



function hint(el) {
    el.style.display = 'none';
}

function health() {
    strHTML = ''
    var lifeDOM = document.querySelector('.heart')
    for (var i = 0; i < LIFE; i++)  strHTML += '<img src="imgs/heart.png"></img>'
    lifeDOM.innerHTML = strHTML

}


function easy() {
    boardSize = 4
    gMines = 2
    init()
}

function medium() {
    boardSize = 8
    gMines = 12
    init()
}

function hard() {
    boardSize = 12
    gMines = 30
    init()
}





function UpdateWithBombs(board) {
    var newBoard = copyMat(board);
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {

            newBoard[i][j] = {
                isMine: false,
                isFirst: false
            }
        }

    }

    
    while (gMines !== 0) {

        var randomNumI = getRandomInteger(0, boardSize -1)
        var randomNumJ = getRandomInteger(0, boardSize -1)
        console.log(randomNumI);
        
        
        if (newBoard[randomNumI][randomNumJ].isMine) continue
        newBoard[randomNumI][randomNumJ].isMine = true
        gMines--
    }


    return newBoard;
}
