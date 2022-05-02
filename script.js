const GameBoard = (() => {
  let gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  let activePlayer = 1
  const changeField = (fieldNumber) => {
    if (activePlayer === 1) gameBoard[fieldNumber] = 'X'
    else if (activePlayer === 2) gameBoard[fieldNumber] = 'O'
    changeActivePlayer()
  }
  const isFieldEmpty = (fieldNumber) => gameBoard[fieldNumber] === 0
  const getGameBoard = () => gameBoard
  const changeActivePlayer = () => (activePlayer = activePlayer === 1 ? 2 : 1)
  const getActivePlayer = () => activePlayer
  const resetGameBoard = () => {
    gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
  return {
    changeField,
    isFieldEmpty,
    getGameBoard,
    getActivePlayer,
    resetGameBoard,
  }
})()

const DisplayController = () => {}
