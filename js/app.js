
'use strict'
var gBoard;
var boardSize = 8
var BOMB = ''
var LIFE;
var lifeDOM = document.querySelector('.heart')
var gMines = 12
var minesToMiss = 12




var time = document.querySelector('.timer')
var timerIntreval;
var countSafeNums = 0

function init() {
    // clearInterval(timerIntreval)
    document.querySelector('.smile').innerHTML = '<img onclick="resetGame()" src="imgs/normal.png">'
    gBoard = createBoard()
    renderBoard(gBoard)
    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    }, false);
    LIFE = 3
    health()
    countSafeNums = 0

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
            var cell = `<td class =${i}-${j} data-i="${i}" data-j="${j}" onclick = "firstLeftClick(this)"></td>`
            strHTML += cell
        }
    }
    strHTML += '</tr>'
    document.querySelector('.minSweeper').innerHTML = strHTML
}


function firstLeftClick(el) {
    //update MODAL

    var newBoard = UpdateWithBombs(gBoard)
    var ele = el
    var eleI = ele.dataset.i;
    var eleJ = ele.dataset.j;

    newBoard[+eleI][+eleJ].isMine = false
    newBoard[+eleI][+eleJ].isFirst = true
    //update DOM
    renderBoardWithItems(newBoard)
    timer()
    countSafeNums++
    
    return el
}


function renderBoardWithItems(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board.length; j++) {
            var BombCount = countBombs(i, j, board) + ''

            if (board[i][j].isFirst) strHTML +=
            `<td class ="hidden-first" data-i="${i}" 
            data-j="${j}" onclick="removeHidden(this)" onload ="timer()"
               oncontextmenu= "rightClick(this)"> ${BombCount}</td>`

            else if (board[i][j].isMine) strHTML += `<td  class = "bomb" 
              data-i="${i}" data-j="${j}" onclick="showBomb(this)"
               oncontextmenu= "rightClick(this)">${BOMB}</td>`
                                                else strHTML += `<td class ="hidden" onclick="removeHidden(this)"
               data-i="${i}" data-j="${j}" data-board="${board}" oncontextmenu= "rightClick(this)">${BombCount}</td>`


        }
    }
    strHTML += '</tr>'


    document.querySelector('.minSweeper').innerHTML = strHTML
    var firstClicked = document.querySelector('.hidden-first').oncontextmenu = false

}


function removeHidden(el) {
    el.style.backgroundColor = '#57a647'
    el.classList.remove('hidden')
    el.onclick = false;
    countSafeNums++
    console.log(countSafeNums);
    el.oncontextmenu = false
    
    if (countSafeNums === boardSize ** 2 - minesToMiss) {
        victory()

    }
    if (el.innerText === '0') el.style.color = 'blue'
    if (el.innerText === '1') el.style.color = 'green'
    if (el.innerText === '2') el.style.color = 'yellow'
    if (el.innerText === '3') el.style.color = 'red'
    if (el.innerText === '4') el.style.color = 'red'


}


function showBomb(el) {
    el.innerHTML = '<img src="imgs/bomb.png">'
    LIFE--
    health()
    document.querySelector('.smile').innerHTML = '<img onclick="resetGame()" src="imgs/sad.png">'
    el.onclick = false;
    el.style.backgroundColor = 'red'
    if (LIFE == 0) {
        gameOver()
    }
    el.oncontextmenu = false
}


function rightClick(el) {
    if (el.innerHTML === '<img src="imgs/flag.png">') {

        if (el.getAttribute('class') === 'hidden') {
            el.innerHTML = countBombs(el.getAttribute('data-i'), el.getAttribute('data-i'), el.getAttribute('data-board'))

        }

        else if (el.getAttribute('class') === 'bomb') {
            el.innerHTML = `${BOMB}`
            
            console.log(el)

        }
    }

    else el.innerHTML = '<img src="imgs/flag.png">'
    el.onclick = false;

}

function resetGame() {
    init()
}
function gameOver() {

    showAll()
    clearInterval(timerIntreval)

}


function victory() {

    clearInterval(timerIntreval)
    document.querySelector('.smile').innerHTML = '<img onclick="resetGame()" src="imgs/cool.png">'
    showAll()

}





function happy() {
    document.querySelector('.smile').innerHTML = '<img onclick="resetGame()" src="imgs/happy.png">'

}



function hint(el) {
    el.style.display = 'none';
}

function health() {
    var strHTML = ''
    var lifeDOM = document.querySelector('.heart')
    for (var i = 0; i < LIFE; i++)  strHTML += '<img src="imgs/heart.png"></img>'
    lifeDOM.innerHTML = strHTML

}


function easy() {
    boardSize = 4
    gMines = 2
    minesToMiss = 2
    init()
    clearInterval(timerIntreval)
    time.innerHTML = `<h2> time :  0 </h2> `
}

function medium() {
    boardSize = 8
    gMines = 12
    minesToMiss = 12
    init()
    clearInterval(timerIntreval)
    time.innerHTML = `<h2> time :  0 </h2> `
}

function hard() {
    boardSize = 12
    gMines = 30
    minesToMiss = 30
    init()
    clearInterval(timerIntreval)
    time.innerHTML = `<h2> time :  0 </h2> `

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

        var randomNumI = getRandomInteger(0, boardSize - 1)
        var randomNumJ = getRandomInteger(0, boardSize - 1)
        if (newBoard[randomNumI][randomNumJ].isMine) continue
        newBoard[randomNumI][randomNumJ].isMine = true
        gMines--
    }
    return newBoard;
}

function timer() {
    var s = 0
    var m = 0
    time.innerHTML = `<h2> time :  ${s} </h2> `
    timerIntreval = setInterval(function () {
        s += 1
        time.innerHTML = `<h2> time : ${s} </h2> `
    }, 1000)

}


function showAll() {
    var bombs = document.querySelectorAll('.bomb')
    for (var i = 0; i < bombs.length; i++) {
        bombs[i].innerHTML = '<img src="imgs/bomb.png">'
        bombs[i].style.pointerEvents = "none";

    }
    var hiddens = document.querySelectorAll(".hidden")
    for (var i = 0; i < hiddens.length; i++) {
        hiddens[i].classList.remove('hidden')
        hiddens[i].style.pointerEvents = 'none';

    }

}
