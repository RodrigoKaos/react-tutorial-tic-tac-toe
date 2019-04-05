import React from 'react';
import Board from './Board.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
      sort: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        collumn: this.getSquareCollumn(i),
        row: this.getSquareRow(i)
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });

  }

  getSquareCollumn(i){
    return 1 + i % 3;
  }

  getSquareRow(i){
    return 1 + Math.floor(i / 3);
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  calculateWinner(squares) {
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
        return { winner: squares[a], winnerRow: lines[i] };
      }
    }
    return { winner: null, winnerRow: null };
  }

  toggleSort(){
    this.setState({
      sort: !this.state.sort
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const {winner, winnerRow} = this.calculateWinner(current.squares);
    
    
    let moves = history.map((step, move) => {
      
      let messase0 = 'Go to game start';
      let messase1 = `Go to move #${move} collumn:${step.collumn} row:${step.row}`;      
      let desc = move ? messase1 : messase0;
      
      
      return (
        <li key={move}>
          <button
            className={move === this.state.stepNumber ? 'bold': ''} 
            onClick={() => this.jumpTo(move) 
            }>
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerSquares={winnerRow}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.toggleSort()}>Sort</button>
          <ol>{this.sort ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}

export default Game;