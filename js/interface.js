console.log("interface.js conneted");

let turn = 'player1';
let player1Name = '';
let player2Name = '';

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

  } else if ( gameState === 'player1') {

      console.log(`${player1Name} Wins!` );
      $(".gameResult").text(`${player1Name} Wins!`)
      $(".gameResult").removeClass('hidden')
      //no more clicking on the board after someone wins
      $('td').unbind('click');
    } else if ( gameState === 'player2') {

        console.log(`${player2Name} Wins!` );
        $(".gameResult").text(`${player2Name} Wins!`)
        $(".gameResult").removeClass('hidden')
        //no more clicking on the board after someone wins
        $('td').unbind('click');
      } else if ( gameState === 'Draw') {

          console.log(`It's a Draw!` );
          $(".gameResult").text(`It's a Draw!`)
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

  player1Name = $("#player1").find('h2').html();
  player2Name = $("#player2").find('h2').html();

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

//read Player name values and change the player names on screen

    $('#changeName').on('click', function() {
      console.log($(':checked').attr("id"));
      if ($(':checked').attr("id") === 'p1') {
        player1Name = $('#newName').val();
        $("#player1").find('h2').html(player1Name);
        console.log(player1Name);

      } else if ($(':checked').attr("id") === 'p2') {
        player2Name = $('#newName').val();
        $("#player2").find('h2').html(player2Name);
        console.log(player2Name);
      }




    })

})
