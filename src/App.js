import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';


import './App.css';
import 'react-notifications/lib/notifications.css';

import Tile from './Tile'
import ResetButton from './ResetButton'
import GameStaus from './GameStaus';
import ScoreBoard from './ScoreBoard'


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
      winner: null,
      match: 0,
      wins: {
        O: 0,
        X: 0
      }
    }
  }

  createNotification(type) {
    switch (type) {
      case 'success':
        NotificationManager.success(`Player ${this.state.turn} wins`, 'Congratulations', 3000);
        break;
      case 'warning':
        NotificationManager.warning('Play Again', 'Draw', 3000);
        break;
    };
    return
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

      if (this.state.turn === 'o') {
        this.state.wins.O++
      }

      if (this.state.turn === 'x') {
        this.state.wins.X++
      }
      this.state.match++
      this.createNotification('success')
      this.resetBoard()
      return
    }

    let middleRow = this.state.gameBoard[3] + this.state.gameBoard[4] + this.state.gameBoard[5]
    if (middleRow.match(/xxx|ooo/)) {
      this.setState({ winner: `${this.state.turn} wins` })

      if (this.state.turn === 'o') {
        this.state.wins.O++
      }

      if (this.state.turn === 'x') {
        this.state.wins.X++
      }
      this.state.match++
      this.createNotification('success')
      this.resetBoard()
      return
    }

    let bottomRow = this.state.gameBoard[6] + this.state.gameBoard[7] + this.state.gameBoard[8]
    if (bottomRow.match(/xxx|ooo/)) {
      this.setState({ winner: `${this.state.turn} wins` })

      if (this.state.turn === 'o') {
        this.state.wins.O++
      }

      if (this.state.turn === 'x') {
        this.state.wins.X++
      }
      this.state.match++
      this.createNotification('success')
      this.resetBoard()
      return
    }

    let leftCol = this.state.gameBoard[0] + this.state.gameBoard[3] + this.state.gameBoard[6]
    if (leftCol.match(/xxx|ooo/)) {
      this.setState({ winner: `${this.state.turn} wins` })

      if (this.state.turn === 'o') {
        this.state.wins.O++
      }
      this.state.match++
      if (this.state.turn === 'x') {
        this.state.wins.X++
      }

      this.createNotification('success')
      this.resetBoard()
      return
    }

    let midCol = this.state.gameBoard[1] + this.state.gameBoard[4] + this.state.gameBoard[7]
    if (midCol.match(/xxx|ooo/)) {
      this.setState({ winner: `${this.state.turn} wins` })

      if (this.state.turn === 'o') {
        this.state.wins.O++
      }

      if (this.state.turn === 'x') {
        this.state.wins.X++
      }
      this.state.match++
      this.createNotification('success')
      this.resetBoard()
      return
    }

    let rightCol = this.state.gameBoard[2] + this.state.gameBoard[5] + this.state.gameBoard[8]
    if (rightCol.match(/xxx|ooo/)) {
      this.setState({ winner: `${this.state.turn} wins` })

      if (this.state.turn === 'o') {
        this.state.wins.O++
      }

      if (this.state.turn === 'x') {
        this.state.wins.X++
      }
      this.state.match++
      this.createNotification('success')
      this.resetBoard()
      return
    }

    let leftDiag = this.state.gameBoard[0] + this.state.gameBoard[4] + this.state.gameBoard[8]
    if (leftDiag.match(/xxx|ooo/)) {
      this.setState({ winner: `${this.state.turn} wins` })

      if (this.state.turn === 'o') {
        this.state.wins.O++
      }

      if (this.state.turn === 'x') {
        this.state.wins.X++
      }
      this.state.match++
      this.createNotification('success')
      this.resetBoard()
      return
    }

    let rightDiag = this.state.gameBoard[2] + this.state.gameBoard[4] + this.state.gameBoard[6]
    if (rightDiag.match(/xxx|ooo/)) {
      this.setState({ winner: `${this.state.turn} wins` })

      if (this.state.turn === 'o') {
        this.state.wins.O++
      }

      if (this.state.turn === 'x') {
        this.state.wins.X++
      }
      this.state.match++
      this.createNotification('success')
      this.resetBoard()
      return
    }

    let moves = this.state.gameBoard.join('').replace(/ /g, '')
    if (moves.length === 9) {
      this.setState({ winner: 'draw' })
      this.createNotification('warning')
      this.resetBoard()
      this.state.match++
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

    return (
      <div>
        <ScoreBoard X={this.state.wins.X} O={this.state.wins.O} />
        <div className="container">
          <NotificationContainer />

          <div className="menu">
            <h1>Tic  Tac  Toe</h1>
            <h3>Games Played {this.state.match}</h3>
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
      </div>
    );
  }
}

export default App;
