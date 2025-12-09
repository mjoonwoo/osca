import React, { useEffect, useState } from 'react';
import { gameSubject, initGame } from './Game';
import Board from './Board';
import { undo, redo } from './Game';
import { convertMove } from './AnalyzePosition';

function Analyze() {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();
  const [analysis, setAnalysis] = useState(null);
  
  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board)
      setIsGameOver(game.isGameOver)
      setResult(game.result)
      setAnalysis(game.analysis || null)
  });
    return () => subscribe.unsubscribe();
  }, [])
  
  return (
    <div>
      <div className="analysis">
        <p className="horizontal-text">
          Best Move: {analysis ? convertMove(analysis.bestmove.split(' ')[1], board) : ''}
        </p>
        <p className="horizontal-text">
          Evaluation:{' '}
          {analysis
            ? analysis.evaluation
            ? analysis.evaluation
            : analysis.mate
            ? analysis.mate > 0
            ? `M${analysis.mate}`
            : `-M${-analysis.mate}`
            : ''
            : ''}
        </p>
      </div>
      <div className="game-row">
        {isGameOver && <h2 className="vertical-text">GAME OVER</h2>}
        <div className="board-container">
          <Board board={board} />
        </div>
        {result && <p className="vertical-text">{result}</p>}
      </div>
      <div>
        <button className="move-button" onClick={undo}>
          {'<'}
        </button>
        <button className="move-button" onClick={redo}>
          {'>'}
        </button>
      </div>
    </div>
  );
}

export default Analyze;