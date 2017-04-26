import React, { Component } from 'react';

class GameStatus extends Component {
  render() {
    return (
      <div className="game-status">
        <p>Games Played
          <span> {`${this.props.match}`}</span>
        </p>
      </div>
    );
  }
}

export default GameStatus;