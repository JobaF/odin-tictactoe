const Game = (() => {
  let gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  let activePlayer = 1
  const changeField = (fieldNumber) => {
    if (activePlayer === 1) gameBoard[fieldNumber] = 'X'
    else if (activePlayer === 2) gameBoard[fieldNumber] = 'O'
  }
  const doTurn = (fieldNumber) => {
    if (isGameOver() != true) {
      changeField(fieldNumber)
      changeActivePlayer()
    }
  }
  const isDiagonalWin = () => {
    const isLeftTopToRightBottomDiagonalWin =
      gameBoard[0] === gameBoard[4] &&
      gameBoard[4] === gameBoard[8] &&
      gameBoard[0] !== 0

    const isRightTopToLeftBottomDiagonalWin =
      gameBoard[2] === gameBoard[4] &&
      gameBoard[4] === gameBoard[6] &&
      gameBoard[2] !== 0
    return !!(
      isLeftTopToRightBottomDiagonalWin || isRightTopToLeftBottomDiagonalWin
    )
  }
  const isHorizontalWin = () => {
    const isTopHorizontalWin =
      gameBoard[0] === gameBoard[1] &&
      gameBoard[1] === gameBoard[2] &&
      gameBoard[0] != 0
    const isMidHorizontalWin =
      gameBoard[3] === gameBoard[4] &&
      gameBoard[4] === gameBoard[5] &&
      gameBoard[3] != 0
    const isBotHorizontalWin =
      gameBoard[6] === gameBoard[7] &&
      gameBoard[7] === gameBoard[8] &&
      gameBoard[6] != 0

    return !!(isTopHorizontalWin || isMidHorizontalWin || isBotHorizontalWin)
  }
  const isVerticalWin = () => {
    const isLeftVerticallWin =
      gameBoard[0] === gameBoard[3] &&
      gameBoard[3] === gameBoard[6] &&
      gameBoard[0] !== 0
    const isMidVerticallWin =
      gameBoard[1] === gameBoard[4] &&
      gameBoard[4] === gameBoard[7] &&
      gameBoard[1] !== 0
    const isRightVerticallWin =
      gameBoard[2] === gameBoard[5] &&
      gameBoard[5] === gameBoard[8] &&
      gameBoard[2] !== 0

    return !!(isLeftVerticallWin || isMidVerticallWin || isRightVerticallWin)
  }
  const isGameOver = () => {
    return isDiagonalWin() || isHorizontalWin() || isVerticalWin()
  }

  const isFieldEmpty = (fieldNumber) => gameBoard[fieldNumber] === 0
  const getGameBoard = () => gameBoard
  const changeActivePlayer = () => (activePlayer = activePlayer === 1 ? 2 : 1)
  const getActivePlayer = () => activePlayer
  const resetGame = () => {
    gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
  return {
    isGameOver,
    doTurn,
    isFieldEmpty,
    getGameBoard,
    getActivePlayer,
    resetGame,
  }
})()

const Renderer = (() => {
  const handleCellClick = (e) => {
    const cellId = e.target.id
    if (Game.isFieldEmpty(cellId)) {
      Game.doTurn(cellId)
      renderGameBoard()
    }
  }

  const renderGameBoard = () => {
    const gameboardContainer = document.querySelector('.gameboard')
    gameboardContainer.innerHTML = ''
    const gameBoard = Game.getGameBoard()
    for (let i = 0; i < 9; i++) {
      const div = document.createElement('div')
      div.textContent = gameBoard[i] === 0 ? '' : gameBoard[i]
      div.id = i
      div.classList.add('cell')
      div.addEventListener('click', handleCellClick)
      gameboardContainer.append(div)
    }

    const gameEnding = document.querySelector('.game-ending')
    const gameEnded = Game.isGameOver()
    gameEnding.textContent = gameEnded ? 'GAME OVER!' : ''
  }
  renderGameBoard()

  return { renderGameBoard }
})()

const resetGame = () => {
  Game.resetGame()
  Renderer.renderGameBoard()
}
