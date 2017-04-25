import React, { Component } from 'react';

class ScoreBoard extends Component {
  render() {
    // {{ wins.O }}
    // {{ wins.X }}
    return (
      <div className="score-board">
        <span>O has {this.props.O} wins</span>
        <h2>Score Board</h2>
        <span>X has {this.props.X} wins</span>
      </div>
    );
  }
}

export default ScoreBoard;