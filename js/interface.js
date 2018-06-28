console.log("interface.js conneted");

let turn = 'player1';
let player1Name = '';
let player2Name = '';

//this is run when a player clicks on one of the td elements on the board
//or when it is called as part of the AI play
const playGame = function (element) {


  let rowName = $(element).parent().attr('id');
  let colName = $(element).attr('id');
  console.log(rowName, colName);
  let row = + rowName[3];
  let col = + colName[3];

  let marked = ticTacToe.mark(turn,row,col);
  updateBoard();

//handling turn based animations and effects
  let gameState = ticTacToe.checkBoard();
  if ( gameState === '' && marked === true) {

    if (turn === 'player1') {
      turn = 'player2';
      $('#player1 h2').addClass('inactivePlayer');
      $('#player1 h2').removeClass('activePlayer');

      $('#player1 p').removeClass('activeLetter');
      $('#player2 p').addClass('activeLetter');
    } else {
      turn = 'player1';
      $('#player1 h2').removeClass('inactivePlayer');
      $('#player1 h2').addClass('activePlayer');

      $('#player2 p').removeClass('activeLetter');
      $('#player1 p').addClass('activeLetter');
    }
//in case of a winner the result banner will pop up here
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
          $(`#row${i+1} #col${j+1} div`).text(' ');
          break;
        case 1:
          $(`#row${i+1} #col${j+1} div`).text('X');
          break;
        case -1:
          $(`#row${i+1} #col${j+1} div`).text('O');
          break;
        default:

      }
    }

  }
}

//this function is triggered when a new board size has been chosen and updates the table

const changeBoardSize = function() {
  //clean the current table on screen
  $('table').html(' ');
  //construct the html code for the table
  let newTable = ''
  for (var i = 0; i < ticTacToe.theBoard.length; i++) {
    newTable += `<tr id="row${i+1}">\n`;
    for (var j = 0; j < ticTacToe.theBoard.length; j++) {
      newTable += `<td id="col${j+1}"><div></div></td>\n`;
    }
    newTable += `</tr>\n`;
  };
  //insert the html code for the new table size
  $('table').html(newTable);
  //this is where we handle the styling for the new size board
    //width
    let boxSize = 39; //in vw scale
    let tdSize = (39) / ticTacToe.theBoard.length;
    $('td div').width(`${tdSize}vw`);
    //height
    $('td div').height(`${tdSize}vw`);
    //font size
    $('td div').css("font-size",`${tdSize * 1.13333}vw`);
    $('td div').css("line-height", `${tdSize}vw`);
  //after the new table is created we need to rebind clicking to td elements
  clickBindTd();

}

//DRYed up the code by doing the click bind to td element in table
const clickBindTd =  function() {
  $('td').on('click', function () {
    let that = this;
    playGame(that);
    //when The Machine is called to play
    if (player1Name === "The Machine" || player2Name === "The Machine") {
      theMachineMoves();
    }
  });
}


//load functions that are DOM dependent here
$(document).ready(function () {

  player1Name = $("#player1").find('h2').html();
  player2Name = $("#player2").find('h2').html();

  clickBindTd();



//clear the boards if reset button is pressed
  $('#reset').on('click', function() {
    console.log('reset');
    ticTacToe.clear();
    updateBoard();
    //re-bind click to the board
    clickBindTd();
    //hide the gameResultbanner
    $(".gameResult").addClass('hidden')

    //return the focus on player1 name

    $('#player1 h2').removeClass('inactivePlayer');
    $('#player1 h2').addClass('activePlayer');
  })

//read Player name values and change the player names on screen

    $('#changeName').on('click', function() {
      console.log($(':checked').attr("id"));
      if ($(':checked').attr("id") === 'p1') {
        player1Name = $('#newName').val();
        $("#player1").find('h2').html(player1Name);
        //this is where we make a decision if a player is gonna be played by the computer

        if (player1Name ==='The Machine') {
          theMachineMoves();
        };
        console.log(player1Name);

      } else if ($(':checked').attr("id") === 'p2') {
        player2Name = $('#newName').val();
        $("#player2").find('h2').html(player2Name);
        console.log(player2Name);
      }

    })

//on new value on board range slide input, recreate the boards

      $('input[type="range"]').on('input',function() {
        let size = $(this).val();
        $("#boardSizeDial").find('p').html(`Board Size: ${size}`);
        ticTacToe.createBoard(size);
        changeBoardSize();
        $(".gameResult").addClass('hidden')
      })

})
