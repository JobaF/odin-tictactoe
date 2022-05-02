const Game = (() => {
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

const Renderer = (() => {
  const handleCellClick = (e) => {
    const cellId = e.target.id
    if (Game.isFieldEmpty(cellId)) {
      Game.changeField(cellId)
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
  }
  renderGameBoard()
})()
