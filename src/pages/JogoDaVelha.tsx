import { useState } from "react";
import "../styles/JogoDaVelha.css";

const JogoDaVelha = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
    } else if (!newBoard.includes(null)) {
      setWinner("empate");
    }
  };

  const checkWinner = (b) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, bIndex, c] of lines) {
      if (b[a] && b[a] === b[bIndex] && b[a] === b[c]) {
        return b[a];
      }
    }
    return null;
  };

  const restartGame = () => {
    setBoard(initialBoard);
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <div className="jogo-container">
      <h1>Jogo da Velha</h1>
      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>

      {winner && (
        <p className="resultado">
          {winner === "empate" ? "Deu empate, sô!" : `Vitória do ${winner}!`}
        </p>
      )}

      <button className="reset-btn" onClick={restartGame}>
        Reiniciar
      </button>
    </div>
  );
};

export default JogoDaVelha;
