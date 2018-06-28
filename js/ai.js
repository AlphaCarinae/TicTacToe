console.log('AI module loaded');

//this function will inspect to see if there is a chance of winning
//for any player on the next move, or moves
const movesToWin = function (arrayOfArrays,depth) {

  //checking all the rows for a chance to win
  for (var i = 0; i < arrayOfArrays.length; i++) {
    //returning a row with 'depth' empty cells remaining, regardless of player
      if (Math.abs(summArray(arrayOfArrays[i])) === (arrayOfArrays.length-depth)) {
        return `row${i}`;
      }
    }

  //checking all the columns for a chance to win

  for (var j = 0; j < arrayOfArrays.length; j++) {

      columns=[];
      for (var i = 0; i < arrayOfArrays.length; i++) {
        columns.push(arrayOfArrays[i][j]);

      }
      if (Math.abs(summArray(columns)) === (arrayOfArrays.length-depth)) {
        return `col${j}`;
      }

  }
  //checking both diagonal lines for a chance to win in depth moves
  let diagUl =[];
  let diagUr =[];
  for (var i = 0; i < arrayOfArrays.length; i++) {
    diagUl.push(arrayOfArrays[i][i]);
    diagUr.push(arrayOfArrays[i][arrayOfArrays.length-i-1]);

  }
  if (Math.abs(summArray(diagUl)) === (arrayOfArrays.length-depth)) {
    return 'diagUl';
  }
  if (Math.abs(summArray(diagUr)) === (arrayOfArrays.length-depth)) {
    return 'diagUr';
  }

else return '';
}


//a function to generate random row and column numbers

const randomNum =  function(max) {

  coords = Math.floor(Math.random() * max);
  return coords;
}


//the function to call when it is The Machine's turn to move

const theMachineMoves = function() {
  let matrixSize = ticTacToe.theBoard.length;
//check board conditions
let remainingMoves = movesToWin(ticTacToe.theBoard,1)
//random move if there are no rows leading to a win
  if (remainingMoves === '') {
      i = randomNum(matrixSize);
      j = randomNum(matrixSize);

      while (ticTacToe.theBoard[i][j] !== 0) {
        i = randomNum(matrixSize);
        j = randomNum(matrixSize);
      }
      // let theElement = ``
      // playGame();
//if we have a chance see whose row is it and place the winning or blocking character
  } else if (remainingMoves !== '') {
      let num = remainingMoves.pop();
      if (remainingMoves === 'row') {
        // playGame()

      } else if (remainingMoves === 'col') {
          let num = remainingMoves.pop()
          let rowValue = 0;
          for (var i = 0; i < matrixSize; i++) {
            if (ticTacToe.theBoard[i][num] === 0) {
              rowValue = i;
            }
          }



      } else if (remainingMoves === 'diagUl') {

      } else if (remainingMoves === 'diagUr') {

      }

  }

}
