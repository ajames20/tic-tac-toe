import React, { Component } from 'react';

class ScoreBoard extends Component {
  render() {
    return (
      <div className="score-board">
        <span>O has {this.props.O} wins</span>
        <span>X has {this.props.X} wins</span>
      </div>
    );
  }
}

export default ScoreBoard;