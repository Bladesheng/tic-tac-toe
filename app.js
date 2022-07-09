const game = (() => {
  let currentPlayer = 1;
  let freeze = false;


  const info = () => {
    gameBoard.info();
    if (freeze) {return};
    console.log(`Current player is: Player ${currentPlayer}`);
  }

  const reset = () => {
    currentPlayer = 1;
    freeze = false;
    gameBoard.reset();
    info();
  }

  const mark = (position) => {
    gameBoard.insert(position, currentPlayer);

    _evaluateBoard();

    _nextPlayer();

    info();
  }
  
  const _evaluateBoard = () => {
    // true == tie, number == winner, false == normal game
    const gameStatus = gameBoard.checkGameOver();
  
    if (gameStatus === true) {
      console.log("Tie.");
      _freezeBoard();
    }
    else if (gameStatus > 0) {
      console.log(`Player ${gameStatus} won the game.`)
      _freezeBoard();
    }
  }

  const _freezeBoard = () => {
    //freezes the board until reset button is clicked
    freeze = true;
  }

  const _nextPlayer = () => {
    if (currentPlayer === 1) {
      currentPlayer = 2;
    }
    else {
      currentPlayer = 1;
    }
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

  return {
    reset,
    info,
    insert,
    checkGameOver
  };
})();


// start first game
game.reset();
