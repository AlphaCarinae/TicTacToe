console.log("interface.js conneted");

let turn = 'player1';

const playGame = function (element) {

  let rowName = $(element).parent().attr('id');
  let colName = $(element).attr('id');
  console.log(rowName, colName);
  let row = + rowName[3];
  let col = + colName[3];

  ticTacToe.mark(turn,row,col);
  updateBoard();

  let gameState = ticTacToe.checkBoard();
  if ( gameState === '') {

    if (turn === 'player1') {
      turn = 'player2';
    } else {
      turn = 'player1';
    }

  } else {
      console.log(`${gameState} Wins!` );
      $(".gameResult").text(`${gameState} Wins!`)
      $(".gameResult").removeClass('hidden')
      //no more clicking on the board after someone wins
      $('td').unbind('click');
    }
  }


//read the values from the board matrix and update the html
const updateBoard = function() {
  for (var i = 0; i < ticTacToe.theBoard.length; i++) {

    for (var j = 0; j < ticTacToe.theBoard.length; j++) {

      switch (ticTacToe.theBoard[i][j]) {
        case 0:
          $(`#row${i+1} #col${j+1}`).text(' ');
          break;
        case 1:
          $(`#row${i+1} #col${j+1}`).text('X');
          break;
        case -1:
          $(`#row${i+1} #col${j+1}`).text('O');
          break;
        default:

      }
    }

  }
}



$(document).ready(function () {

  $('td').on('click', function () {
    let that = this;
    playGame(that);
  });
//clear the boards if reset button is pressed
  $('#reset').on('click', function() {
    console.log('reset');
    ticTacToe.clear();
    updateBoard();
//re-bind click to the board
    $('td').on('click', function () {
      let that = this;
      playGame(that);
    });
//hide the gameResultbanner
    $(".gameResult").addClass('hidden')
  })

})
