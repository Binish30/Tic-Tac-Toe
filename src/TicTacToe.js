// src/TicTacToe.js
import React, { useState } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [playerNames, setPlayerNames] = useState({ player1: '', player2: '' });
  const [showNameInput, setShowNameInput] = useState(false); // New state for showing name inputs

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board) || isGameOver) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    const winner = calculateWinner(newBoard);

    if (winner) {
      setScores((prevScores) => ({ ...prevScores, [winner]: prevScores[winner] + 1 }));
      setIsGameOver(true);
    } else {
      setIsXNext(!isXNext); // Switch turns
    }
  };

  const calculateWinner = (squares) => {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setIsGameOver(false);
  };

  const startTwoPlayer = () => {
    setShowNameInput(true); // Show name inputs when 2 Players is clicked
  };

  const confirmPlayers = () => {
    if (playerNames.player1 && playerNames.player2) {
      setShowMenu(false);
      resetGame();
    } else {
      alert("Please enter names for both players.");
    }
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setPlayerNames((prevNames) => ({ ...prevNames, [name]: value }));
  };

  return (
    <div className="game">
      {showMenu ? (
        <div className="menu">
          <h1>Select Game Mode</h1>
          <button onClick={startTwoPlayer}>2 Players</button>
          
          {showNameInput && (
            <div>
              <input
                type="text"
                name="player1"
                placeholder="Player 1 Name"
                value={playerNames.player1}
                onChange={handleNameChange}
              />
              <input
                type="text"
                name="player2"
                placeholder="Player 2 Name"
                value={playerNames.player2}
                onChange={handleNameChange}
              />
              <button onClick={confirmPlayers}>Start Game</button>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="status">
            {isGameOver ? `Winner: ${calculateWinner(board)}` : `Next player: ${isXNext ? playerNames.player1 : playerNames.player2}`}
          </div>
          <div className="board">
            {board.map((square, index) => (
              <button
                key={index}
                className={`square ${square === 'X' ? 'x' : square === 'O' ? 'o' : ''}`}
                onClick={() => handleClick(index)}
              >
                {square}
              </button>
            ))}
          </div>
          <button onClick={resetGame}>Restart</button>
          <div className="scores">
            <h2>Scores</h2>
            <p>{playerNames.player1}: {scores.X} | {playerNames.player2}: {scores.O}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default TicTacToe;
