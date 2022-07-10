function numToMark(playerNumber) {
  return (playerNumber === 1) ? "X" : "O"; 
}


const game = (() => {
  let currentPlayer = 1;
  let freeze = false;

  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile, position) => {
    tile.addEventListener("click", () => {
      mark(position);
    })
  });

  const resetBtn = document.querySelector(".reset");
  resetBtn.addEventListener("click", () => {reset()})


  const info = () => {
    gameBoard.info();
    if (freeze) {return};
    _updateInfo(`Player ${numToMark(currentPlayer)}'s turn`)
    console.log(`Current player is: Player ${currentPlayer}`);
  }

  const reset = () => {
    currentPlayer = 1;
    freeze = false;
    tiles.forEach((tile, position) => {
      gameBoard.fillTile(position, 0)
    })
    gameBoard.reset();
    info();
  }

  const mark = (position) => {
    if (freeze || gameBoard.isFilled(position)) {return};

    gameBoard.fillTile(position, currentPlayer);

    gameBoard.insert(position, currentPlayer);

    _evaluateBoard();

    _nextPlayer();

    info();
  }
  
  const _evaluateBoard = () => {
    // true == tie, number == winner, false == normal game
    const gameStatus = gameBoard.checkGameOver();
  
    if (gameStatus === true) {
      _updateInfo("It's a draw!")
      console.log("Tie.");
      _freezeBoard();
    }
    else if (gameStatus > 0) {
      _updateInfo(`Player ${numToMark(gameStatus)} has won!`)
      console.log(`Player ${gameStatus} won the game.`)
      _freezeBoard();
    }
  }

  const _freezeBoard = () => {
    //freezes the board until reset button is clicked
    freeze = true;
  }

  const _nextPlayer = () => {
    currentPlayer = (currentPlayer === 1) ? 2 : 1;
  }

  const _updateInfo = (text) => {
    document.querySelector(".info").textContent = text;
  }


  return {
    info,
    reset,
    mark,
  }
})();


const gameBoard = (() => {
  let _board = [];
  
  const info = () => {
    console.log(_board.slice(0, 3));
    console.log(_board.slice(3, 6));
    console.log(_board.slice(6, 9));
  }

  const reset = () => {
    _board = [0, 0, 0,
              0, 0, 0,
              0, 0, 0];
  }

  const insert = (position, playerNumber) => {
    _board[position] = playerNumber;
  }

  const checkGameOver = () => {
    const winner = _checkWin();
    
    if (winner > 0) {
      return winner; // if win, return winner number
    }
    else if (_checkTie()) {
      return true; // if tie, return true
    }
    else {
      return false; // if no tie or win, return false
    }
  }

  const _checkTie = () => {
    if (! _board.includes(0)) { // if all spaces are filled
      return true;
    }
  }

  const _checkWin = () => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ]

    for (const pattern of winPatterns) {
      // saves all unique numbers from the possible winning line
      const winningLine = new Set([_board[pattern[0]],_board[pattern[1]],_board[pattern[2]]]);
      
      if (
        Array.from(winningLine)[0] !== 0 // exclude lines with only 0s
        &&
        winningLine.size === 1 // if the line contains ONLY 1s or ONLY 2s
        ) {
          return Array.from(winningLine)[0]; // player whose numbers are in the line
        }
    }
  }

  const isFilled = (position) => {
    return (_board[position] !== 0)
  }

  const fillTile = (position, player) => {
    if (player > 0) {
      document.getElementById(position).textContent = numToMark(player);
    }
    else { // for resetting the board
      document.getElementById(position).textContent = "";
    }
  }


  return {
    reset,
    info,
    insert,
    checkGameOver,
    isFilled,
    fillTile,
  };
})();


// start first game
game.reset();
