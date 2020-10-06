document.getElementById('winConWindow').style.display = 'none';
document.getElementById('winConWindow').hidden = false;

let currentPlayer = '';
let board = '';
let winCon = '';
let aiLevel = '';
let moveCounter = 0;

function setPlayer(type) {
  aiLevel = document.querySelector('input[name="difficulty"]:checked').value;
  switch (type) {
    case 'ai':
      players.push(new Player('player', 'You'));
      players.push(new Player('ai', 'Computer'));
      break;
    case 'players':
      let p1Name = document.getElementById('player1').value;
      let p2Name = document.getElementById('player2').value;
      players.push(new Player('player', p1Name));
      players.push(new Player('player2', p2Name));
      break;

    default:
      break;
  }
  currentPlayer = players[0];
  document.getElementById('turnInfo').innerHTML = 'Current Turn: ' + currentPlayer.name;
  let options = document.getElementById('options');
  options.hidden = true;
  startGame();
}

function newGame() {
  players = [];
  winCon = '';
  aiLevel = '';
  moveCounter = 0;
  document.getElementById('winConWindow').style.display = 'none';
  document.getElementById('winConWindow').hidden = false;
  document.getElementById('options').hidden = false;
}

function Player(type, name) {
  this.name = name;
  this.type = type;
}
let players = [];
function GameBoard() {
  this.board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
}
function setBoard() {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      document.getElementById(y + '_' + x).addEventListener('click', clickField);
      document.getElementById(y + '_' + x).innerHTML = '';
    }
  }
}
function updateBoard() {
  document.getElementById('turnInfo').innerHTML = 'Current Turn: ' + currentPlayer.name;
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      document.getElementById(y + '_' + x).addEventListener('click', clickField);
      switch (board[y][x]) {
        case 0:
          document.getElementById(y + '_' + x).innerHTML = '';
          break;
        case 1:
          document.getElementById(y + '_' + x).innerHTML = 'X';
          break;
        case -1:
          document.getElementById(y + '_' + x).innerHTML = 'O';
          break;

        default:
          break;
      }
    }
  }
  if (checkWin() || checkDraw()) {
    switchPlayers();
    console.log(winCon);
    document.getElementById('winConWindow').style.display = 'block';
    document.getElementById('winConMessage').innerHTML = currentPlayer.name + ': ' + winCon;
  } else {
    if (currentPlayer.type === 'ai') {
      if (aiLevel === '1') {
        makeRandomMove();
      } else {
        computerMove();
      }
    }
  }
}
function checkDraw() {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === 0) {
        return false;
      }
    }
  }
  winCon = 'DRAW';
  return true;
}
function checkWin() {
  for (let y = 0; y < board.length; y++) {
    let count = 0;
    for (let x = 0; x < board[y].length; x++) {
      count += board[y][x];
    }
    if (count === 3 || count === -3) {
      console.log('win1');
      winCon = 'WIN';
      return true;
    }
  }
  for (let x = 0; x < board.length; x++) {
    let count = 0;
    for (let y = 0; y < board.length; y++) {
      count += board[y][x];
    }
    if (count === 3 || count === -3) {
      console.log('win2');
      winCon = 'WIN';
      return true;
    }
  }
  let count = 0;
  for (let dia = 0; dia < board.length; dia++) {
    count += board[dia][dia];
  }
  if (count === 3 || count === -3) {
    console.log('win3');
    winCon = 'WIN';
    return true;
  }
  count = 0;
  for (let dia = 0; dia < board.length; dia++) {
    count += board[dia][2 - dia];
  }
  if (count === 3 || count === -3) {
    console.log('win4');
    winCon = 'WIN';
    return true;
  }
  return false;
}
function computerMove() {
  for (let y = 0; y < board.length; y++) {
    let count = 0;
    let empty = { x, y };
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === 0) {
        empty.x = x;
        empty.y = y;
      } else {
        count += board[y][x];
      }
    }
    if (count === 2) {
      board[empty.y][empty.x] = -1;
      switchPlayers();
      updateBoard();
      return;
    }
    if (count === -2) {
      board[empty.y][empty.x] = -1;
      switchPlayers();
      updateBoard();
      return;
    }
  }
  for (let x = 0; x < board.length; x++) {
    let count = 0;
    let empty = { x, y };
    for (let y = 0; y < board.length; y++) {
      if (board[y][x] === 0) {
        empty.x = x;
        empty.y = y;
      } else {
        count += board[y][x];
      }
    }
    if (count === 2) {
      board[empty.y][empty.x] = -1;
      switchPlayers();
      updateBoard();
      return;
    }
    if (count === -2) {
      board[empty.y][empty.x] = -1;
      switchPlayers();
      updateBoard();
      return;
    }
  }
  let count = 0;
  let empty = { x, y };
  for (let dia = 0; dia < board.length; dia++) {
    if (board[dia][dia] === 0) {
      empty.x = dia;
      empty.y = dia;
    } else {
      count += board[dia][dia];
    }
  }
  if (count === 2) {
    board[empty.y][empty.x] = -1;
    switchPlayers();
    updateBoard();
    return;
  }
  if (count === -2) {
    board[empty.y][empty.x] = -1;
    switchPlayers();
    updateBoard();
    return;
  }
  count = 0;
  empty = { x: 0, y: 0 };
  for (let dia = 0; dia < board.length; dia++) {
    if (board[dia][2 - dia] === 0) {
      empty.x = 2 - dia;
      empty.y = dia;
    } else {
      count += board[dia][2 - dia];
    }
  }
  if (count === 2) {
    board[empty.y][empty.x] = -1;
    switchPlayers();
    updateBoard();
    return;
  }
  if (count === -2) {
    board[empty.y][empty.x] = -1;
    switchPlayers();
    updateBoard();
    return;
  }
  makeRandomMove();
}
function makeRandomMove() {
  let z = Math.floor(Math.random() * 3);
  let x = Math.floor(Math.random() * 3);
  console.log(moveCounter);
  console.log(aiLevel);
  if ((moveCounter === 1 || moveCounter === 3) && aiLevel === '3') {
    console.log('inside');
    if (board[1][1] === 0) {
      board[1][1] = -1;
      switchPlayers();
      updateBoard();
      moveCounter++;
      return;
    } else {
      if (board[0][1] === 0) {
        board[0][1] = -1;
        switchPlayers();
        updateBoard();
        moveCounter++;
        return;
      }
      if (board[1][2] === 0) {
        board[1][2] = -1;
        switchPlayers();
        updateBoard();
        moveCounter++;
        return;
      }
      if (board[2][1] === 0) {
        board[2][1] = -1;
        switchPlayers();
        updateBoard();
        moveCounter++;
        return;
      }
      if (board[1][0] === 0) {
        board[1][0] = -1;
        switchPlayers();
        updateBoard();
        moveCounter++;
        return;
      } else {
        makeRandomMove();
      }
    }
  }
  if (board[z][x] === 0) {
    board[z][x] = -1;
    switchPlayers();
    updateBoard();
    moveCounter++;
  } else {
    makeRandomMove();
  }
}
function clickField(e) {
  moveCounter++;
  cords = e.target.id.split('_');
  y = cords[0];
  x = cords[1];
  if (winCon === '') {
    if (currentPlayer.type === 'player') {
      board[y][x] = 1;
    }
    if (currentPlayer.type === 'player2') {
      board[y][x] = -1;
    }
    if (currentPlayer.type !== 'ai') {
      switchPlayers();
      updateBoard();
    }
  }
}
function switchPlayers() {
  if (currentPlayer.type === 'player') {
    currentPlayer = players[1];
  } else {
    currentPlayer = players[0];
  }
}

function startGame() {
  board = new GameBoard().board;
  setBoard(board);
}
