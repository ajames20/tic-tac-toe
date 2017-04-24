import React, { Component } from 'react';

class GameStatus extends Component {
  render() {
    return (
      <div className="game-status">
        <p>
          <span>{`${this.props.player}`}</span>
          's turn
        </p>
      </div>
    );
  }
}

export default GameStatus;