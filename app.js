const gameboard = (() => {
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

    info();
  }
  reset();

  const insert = (position, playerNumber) => {
    _board[position] = playerNumber;
    _checkGameOver();
    info();
  }

  const _checkGameOver = () => {
    _checkTie();
    _checkWin();
  }

  const _checkTie = () => {
    if (! _board.includes(0)) { // if all spaces are filled
      _gameOver();
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

    winPatterns.forEach((pattern) => {
      // saves all unique numbers from the possible winning line
      const winningLine = new Set([_board[pattern[0]],_board[pattern[1]],_board[pattern[2]]]);
      
      if (
        Array.from(winningLine)[0] !== 0 // exclude lines with only 0s
        &&
        winningLine.size === 1 // if the line contains ONLY 1s or ONLY 2s
        ) {      
        _gameOver(
          Array.from(winningLine)[0] // announce the player whose numbers are in the line
        ); 
      }
    })
  }
  
  const _gameOver = (playerNumber) => {
    if (playerNumber === undefined) {
      console.log("Game over. Tie.");
    }
    else {
      console.log(`Game over. Player ${playerNumber} won`);
    }
  }

  return {
    reset,
    info,
    insert,
  };
})();

