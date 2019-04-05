import React from 'react';
import Square from './Square';

class Board extends React.Component {
  
  renderSquare(i) {
    const winnerClass = this.props.winnerSquares && 
                        (this.props.winnerSquares[0] === i ||
                        this.props.winnerSquares[1] === i ||
                        this.props.winnerSquares[2] === i ) 
                        ? 'square-green'
                        : '';
    console.log(winnerClass, this.props.winnerSquares, i);
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        winnerClass={winnerClass}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  createBoard(){
    let board = [];
    let iterator = 0;

    for(let i = 0; i < 3; i++){
      let line = [];
      for (let j = 0; j < 3; j++) {
        line.push(this.renderSquare(iterator));
        iterator++;       
      }
      board.push(<div className="board-row">{line}</div>);
    }
    return board;
  }

  render() {
    return (
      <div>{this.createBoard()}</div>
    );
  }
}

export default Board;