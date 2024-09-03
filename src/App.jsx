import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const gameBoard = [...initialGameBoard.map(x => [...x])]
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameDetails, setGameDetails] = useState([]);
  const [playerName, setPlayerName] = useState({
    X: 'Player 1',
    O: 'Player 2'
  })
  let winner = null;
  for (const detail of gameDetails) {
    const { row, col, player } = detail;
    gameBoard[row][col] = player;
  }
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
    gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
    gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
    gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol == secondSquareSymbol &&
      secondSquareSymbol == thirdSquareSymbol
    ) {
      winner = playerName[firstSquareSymbol];
    }
  }

  const hasDraw = gameDetails.length === 9 && !winner
  function handleSelectSquare(rowIndex, columnIndex) {
    setActivePlayer((prevState) => (prevState === "X" ? "O" : "X"));
    let currentPlayer = "X";

    setGameDetails((prevDetails) => {
      if (gameDetails.length > 0 && prevDetails[0].player === "X") {
        currentPlayer = "O";
      }
      return [
        { row: rowIndex, col: columnIndex, player: currentPlayer },
        ...prevDetails,
      ];
    });
  }

  function resetGame(){
    setActivePlayer("X")
    setGameDetails([])
  }
  function handlePlayerNameChange (symbol, newName){
    setPlayerName(prev => {
      return {...prev, [symbol]: newName}
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            playerName="Player 1"
            playerSymbol="X"
            isActive={activePlayer === "X"}
            handlePlayerNameChange = {handlePlayerNameChange}
          />
          <Player
            playerName="Player 2"
            playerSymbol="O"
            isActive={activePlayer === "O"}
            handlePlayerNameChange = {handlePlayerNameChange}
          />
        </ol>
        { (winner || hasDraw) && <GameOver winner={winner} resetGame={resetGame} />}
        <GameBoard
          handleActiveSquare={handleSelectSquare}
          gameBoard={gameBoard}
        />
      </div>
      <Log gameDetails={gameDetails}></Log>
    </main>
  );
}

export default App;
