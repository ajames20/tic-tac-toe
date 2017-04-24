import React, { Component } from 'react';

import './App.css';
import 'react-notifications/lib/notifications.css';

import Tile from './Tile'
// import Announcement from './Announcement'
import ResetButton from './ResetButton'
import GameStaus from './GameStaus';
import Example from './Example'


class App extends Component {
  constructor() {
    super()

    this.state = {
      gameBoard: [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
      ],
      turn: 'x',
      winner: null
    }
  }

  updateBoard(loc, player) {

    if (this.state.gameBoard[loc] === 'x' || this.state.gameBoard[loc] === 'o' || this.state.winner) {
      // Invalid Move
      return
    }

    let currentGameBoard = this.state.gameBoard
    currentGameBoard.splice(loc, 1, this.state.turn)
    this.setState({ gameBoard: currentGameBoard })

    let topRow = this.state.gameBoard[0] + this.state.gameBoard[1] + this.state.gameBoard[2]
    if (topRow.match(/xxx|ooo/)) {
      this.setState({ winner: `${this.state.turn} wins` })
      return
    }

    let middleRow = this.state.gameBoard[3] + this.state.gameBoard[4] + this.state.gameBoard[5]
    if (middleRow.match(/xxx|ooo/)) {
      this.setState({ winner: `${this.state.turn} wins` })
      return
    }

    let bottomRow = this.state.gameBoard[6] + this.state.gameBoard[7] + this.state.gameBoard[8]
    if (bottomRow.match(/xxx|ooo/)) {
      this.setState({ winner: `${this.state.turn} wins` })
      return
    }

    let leftCol = this.state.gameBoard[0] + this.state.gameBoard[3] + this.state.gameBoard[6]
    if (leftCol.match(/xxx|ooo/)) {
      this.setState({ winner: `${this.state.turn} wins` })
      return
    }

    let midCol = this.state.gameBoard[1] + this.state.gameBoard[4] + this.state.gameBoard[7]
    if (midCol.match(/xxx|ooo/)) {
      this.setState({ winner: `${this.state.turn} wins` })
      return
    }

    let rightCol = this.state.gameBoard[2] + this.state.gameBoard[5] + this.state.gameBoard[8]
    if (rightCol.match(/xxx|ooo/)) {
      this.setState({ winner: `${this.state.turn} wins` })
      return
    }

    let leftDiag = this.state.gameBoard[0] + this.state.gameBoard[4] + this.state.gameBoard[8]
    if (leftDiag.match(/xxx|ooo/)) {
      this.setState({ winner: `${this.state.turn} wins` })
      return
    }

    let rightDiag = this.state.gameBoard[2] + this.state.gameBoard[4] + this.state.gameBoard[6]
    if (rightDiag.match(/xxx|ooo/)) {
      this.setState({ winner: `${this.state.turn} wins` })
      return
    }

    let moves = this.state.gameBoard.join('').replace(/ /g, '')
    if (moves.length === 9) {
      this.setState({ winner: 'draw' })
    }

    this.setState({ turn: (this.state.turn === 'x') ? 'o' : 'x' })

  }

  resetBoard() {
    this.setState({
      gameBoard: [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
      ],
      turn: 'x',
      winner: null
    })

  }


  render() {
    // <Board />
    // <Announcement winner={this.state.winner} />
    return (
      <div className="container">
        <Example winner={this.state.winner} />
        <div className="menu">
          <h1>Tic  Tac  Toe</h1>
        </div>

        <GameStaus player={this.state.turn} />

        <div className="grid">
          {this.state.gameBoard.map((value, i) => {
            return (
              <Tile
                key={i}
                loc={i}
                value={value}
                updateBoard={this.updateBoard.bind(this)}
                turn={this.state.turn}
              />
            )
          })}
        </div>

        <ResetButton reset={this.resetBoard.bind(this)} />

      </div>
    );
  }
}

export default App;
