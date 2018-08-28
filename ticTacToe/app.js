var tttGame = {};
var fakeBoard = [["X", "X", "O"], ["X", "O", "O"], ["O", "X", "O"]];

var addSquareListeners = () => {
  var squares = document.getElementsByTagName("td");
  console.log(squares);
  for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", () => makeMove(squares[i]));
  }
};

var renderBoard = (data = [["", "", ""], ["", "", ""], ["", "", ""]]) => {
  var tableBody = document.createElement("tbody", {
    class: "body"
  });
  data.forEach(row => {
    var tr = document.createElement("tr");
    row.forEach(square => {
      var td = document.createElement("td");
      td.appendChild(document.createTextNode(square));
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });
  document.getElementsByClassName("board")[0].appendChild(tableBody);

  document.getElementsByClassName(
    "result"
  )[0].innerHTML = `Moves are still available`;
  addSquareListeners();
  boardData = data;
};

renderBoard();

var boardData = [["", "", ""], ["", "", ""], ["", "", ""]];
var moves = 0;
var player1 = "X";
var player2 = "O";
var currentWinner;
var gamesWon = {
  x: 0,
  o: 0
};
var playerNames = {
  x: "",
  o: ""
};
var hasGameEnded = false;

var createUserNames = () => {
  playerNames.x = document.getElementById("user1").value;
  playerNames.o = document.getElementById("user2").value;
};
var resetGame = () => {
  hasGameEnded = false;
  moves = 0;
  var element = document.getElementsByClassName("board")[0];
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  renderBoard();
};

var makeMove = square => {
  if (!square.innerHTML) {
    if (moves % 2 === 0) {
      square.innerHTML = `${player1}: ${playerNames[player1.toLowerCase()]}`;
      moves++;
      if (!hasGameEnded) {
        checkGameOver();
      }
    } else {
      square.innerHTML = `${player2}: ${playerNames[player2.toLowerCase()]}`;
      moves++;
      if (!hasGameEnded) {
        checkGameOver();
      }
    }
  } else {
    console.log("you cant make a move here!");
  }
};

var checkGameOver = () => {
  var result;
  result = checkAllCols();
  result = checkAllRows() || result;
  result = checkDiagonals() || result;
  if (result) {
    hasGameEnded = true;
    document.getElementsByClassName(
      "result"
    )[0].innerHTML = `Game Over: ${result} won the game!`;
    handleWinner(result);
  } else if (moves === 9) {
    hasGameEnded = true;
    document.getElementsByClassName(
      "result"
    )[0].innerHTML = `GAME OVER: Its a tie!`;
  }
};

var handleWinner = winner => {
  gamesWon[winner.toLowerCase()]++;
  if (winner === player1) {
    document.getElementsByClassName(
      "winner"
    )[0].innerHTML = `${winner} won the game so ${player2} gets to go first!`;
    var temp = player1;
    player1 = player2;
    player2 = temp;
  } else {
    document.getElementsByClassName(
      "winner"
    )[0].innerHTML = `${winner} won the game so ${player1} gets to go first!`;
  }
  for (let key in gamesWon) {
    document.getElementsByClassName(
      `${key.toLowerCase()}`
    )[0].innerHTML = `${key.toUpperCase()} Games Won: ${gamesWon[key]}`;
  }
};

var checkDiagonals = () => {
  var charsRight = "";
  var charsLeft = "";

  var right = document.getElementsByClassName("rightDiag");
  var left = document.getElementsByClassName("leftDiag");
  for (let i = 0; i < right.length; i++) {
    charsRight = charsRight.concat(right[i].innerHTML.slice(0, 1));
    charsLeft = charsLeft.concat(left[i].innerHTML.slice(0, 1));
  }
  if (charsLeft === "XXX" || charsRight === "XXX") {
    return "X";
  } else if (charsLeft === "OOO" || charsRight === "OOO") {
    return "O";
  }
};

var checkAllCols = () => {
  var result;
  var cols = [
    document.getElementsByClassName("col1"),
    document.getElementsByClassName("col2"),
    document.getElementsByClassName("col3")
  ];
  cols.forEach(col => {
    result = checkCol(col) || result;
  });
  return result;
};

var checkAllRows = () => {
  var result;

  var rows = [
    document.getElementsByClassName("row1"),
    document.getElementsByClassName("row2"),
    document.getElementsByClassName("row3")
  ];
  rows.forEach(row => {
    result = checkCol(row) || result;
  });
  return result;
};

var checkRow = rowSquares => {
  var chars = "";

  for (let i = 0; i < rowSquares.length; i++) {
    chars = chars.concat(rowSquares[i].innerHTML.slice(0, 1));
  }
  if (chars === "XXX") {
    return "X";
  } else if (chars === "OOO") {
    return "O";
  }
};

var checkCol = colSquares => {
  var chars = "";

  for (let i = 0; i < colSquares.length; i++) {
    chars = chars.concat(colSquares[i].innerHTML.slice(0, 1));
  }
  if (chars === "XXX") {
    return "X";
  } else if (chars === "OOO") {
    return "O";
  }
};
