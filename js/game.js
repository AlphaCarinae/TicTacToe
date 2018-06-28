console.log("game.js conneted");

//function to add two numbers
const add =  function(num1,num2) {
  return num1 + num2;
}

//function to calculate the sum of all members of an array
const summArray = function(array) {

  return (array.reduce(add,0));
  }


//checking an array for a winner
const checkArray = function (array) {

  result='';

  for (var i = 0; i < array.length; i++) {
    if (summArray(array) === array.length * 1) {
      result = 'player1';
    } else if (summArray(array) === array.length * -1) {
      result = 'player2';
    }
  }
  return result;
}

//The object holding our Board information and all its methods
//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------
//
const ticTacToe = {

  theBoard : [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ],

  //method to let a player mark the board on row,column coordinates
  mark : function (player,row,column) {
    if (player === 'player1' && this.theBoard[row-1][column-1] === 0) {
      this.theBoard[row-1][column-1] = 1;
      return true;
    } else if (player === 'player2' && this.theBoard[row-1][column-1] === 0) {
      this.theBoard[row-1][column-1] = -1;
      return true;
    } else {
      return false;
    }
  },

  //method to clear the board and reset the game
  clear : function () {
    for (var i = 0; i < this.theBoard.length; i++) {
      for (var j = 0; j < this.theBoard[i].length; j++) {
        this.theBoard[i][j] = 0;
      }
    }
  },


  //method to check the board for a winner after every move
  checkBoard : function () {
    let winner = '';

    //checking all the rows for a win
    for (var i = 0; i < this.theBoard.length; i++) {

      winner = checkArray(this.theBoard[i]);

      if (winner !== '') {
        return winner;
      }

    }

    //checking all the columns
    let zeroCount = 0;
    for (var j = 0; j < this.theBoard.length; j++) {

      columns=[];
      for (var i = 0; i < this.theBoard.length; i++) {
        columns.push(this.theBoard[i][j]);
        //counting zeros to decide if draw
        if (this.theBoard[i][j] === 0) {
          zeroCount += 1;
        }
      }

      winner = checkArray(columns);

      if (winner !== '') {
        return winner;
      }


    }

    //checking the diagonals
    let diagUl =[];
    let diagUr =[];
    for (var i = 0; i < this.theBoard.length; i++) {
      diagUl.push(this.theBoard[i][i]);
      diagUr.push(this.theBoard[i][this.theBoard.length-i-1]);
    }
    winner = checkArray(diagUl);

    if (winner !== '') {
      return winner;
    }

    winner = checkArray(diagUr);

    if (winner !== '') {
      return winner;
    }
    //if no zeros are found after the final array check,
    //we are out of moves without a winner and 'draw' shall be returned
    if (zeroCount === 0) {
      winner = 'Draw'
    }

    return winner;

  },

  //add method to create a board of any size
  createBoard : function (boardSize) {
    ticTacToe.theBoard = [];
    for (var i = 0; i < boardSize; i++) {
      let row = [];
      for (var j = 0; j < boardSize; j++) {
        row.push(0);
      }
      ticTacToe.theBoard.push(row);
    }
  }

}
