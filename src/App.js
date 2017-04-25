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
      maxPlayer: 'x',
      minPlayer: 'o',
      wins: {
        O: 0,
        X: 0
      }
    }
  }



  resetBoard() {
    this.setState({
      gameBoard: [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
      ],
      turn: 'x',
      winner: null,
      maxPlayer: 'x',
      minPlayer: 'o'
    })

  }
  createNotification(type) {
    let winner = this.state.winner
    switch (type) {
      case 'success':
        NotificationManager.success(`Player ${winner} wins`, 'Congratulations', 3000);
        break
      case 'warning':
        NotificationManager.warning('Play Again', 'Draw', 3000);
        break

      default:
        break
    }
    return
  }

  tie(board) {
    let moves = board.join('').replace(/ /g, '')
    if (moves.length === 9) {
      return true
    }

    return false
  }

  winner(board, player) {
    if (
      (board[0] === player && board[1] === player && board[2] === player) ||
      (board[3] === player && board[4] === player && board[5] === player) ||
      (board[6] === player && board[7] === player && board[8] === player) ||
      (board[0] === player && board[3] === player && board[6] === player) ||
      (board[1] === player && board[4] === player && board[7] === player) ||
      (board[2] === player && board[5] === player && board[8] === player) ||
      (board[0] === player && board[4] === player && board[8] === player) ||
      (board[2] === player && board[4] === player && board[6] === player)
    ) {
      return true
    } else {
      return null
    }
  }

  copyBoard(board) {
    return board.slice(0)
  }

  validMove(move, player, board) {
    let newBoard = this.copyBoard(board)
    if (newBoard[move] === ' ') {
      newBoard[move] = player
      return newBoard
    } else {
      return null
    }
  }

  findAiMove(board) {
    let bestMoveScore = 100
    let move = null
    if (this.winner(board, 'x') || this.winner(board, 'o') || this.tie(board)) {
      return null
    }

    for (let i = 0; i < board.length; i++) {
      let newBoard = this.validMove(i, this.state.minPlayer, board)
      if (newBoard) {
        let moveScore = this.maxScore(newBoard)
        if (moveScore < bestMoveScore) {
          bestMoveScore = moveScore
          move = i
        }
      }
    }
    return move
  }

  minScore(board) {
    if (this.winner(board, 'x')) {
      return 10
    } else if (this.winner(board, 'o')) {
      return -10
    } else if (this.tie(board)) {
      return 0
    } else {
      let bestMoveValue = 100
      for (let i = 0; i < board.length; i++) {
        let newBoard = this.validMove(i, this.state.minPlayer, board)
        if (newBoard) {
          let predictedMoveValue = this.maxScore(newBoard)
          if (predictedMoveValue < bestMoveValue) {
            bestMoveValue = predictedMoveValue
          }
        }
      }
      return bestMoveValue
    }
  }

  maxScore(board) {
    if (this.winner(board, 'x')) {
      return 10
    } else if (this.winner(board, 'o')) {
      return -10
    } else if (this.tie(board)) {
      return 0
    } else {
      let bestMoveValue = -100
      for (let i = 0; i < board.length; i++) {
        let newBoard = this.validMove(i, this.state.maxPlayer, board)
        if (newBoard) {
          let predictedMoveValue = this.minScore(newBoard)
          if (predictedMoveValue > bestMoveValue) {
            bestMoveValue = predictedMoveValue
          }
        }
      }
      return bestMoveValue
    }
  }

  gameLoop(move) {
    let player = this.state.turn
    let currentGameBoard = this.validMove(move, player, this.state.gameBoard)

    if (this.winner(currentGameBoard, player)) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: player
      })
      if (player === 'o') {
        this.state.wins.O++
      }

      if (player === 'x') {
        this.state.wins.X++
      }
      this.state.match++
      this.state.winner = player
      this.createNotification('success')
      return
    }

    if (this.tie(currentGameBoard)) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: 'd'
      })
      this.createNotification('warning')
      this.state.match++
      return
    }

    player = 'o'
    currentGameBoard = this.validMove(this.findAiMove(currentGameBoard), player, currentGameBoard)

    if (this.winner(currentGameBoard, player)) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: player
      })
      if (player === 'o') {
        this.state.wins.O++
      }

      if (player === 'x') {
        this.state.wins.X++
      }
      this.state.match++
      this.state.winner = player
      this.createNotification('success')
      return
    }

    if (this.tie(currentGameBoard)) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: 'd'
      })
      this.state.winner = 'd'
      this.createNotification('warning')
      this.state.match++
      return
    }

    this.setState({
      gameBoard: currentGameBoard
    })
  }

  render() {
    return (
      <div className="">
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
                  gameLoop={this.gameLoop.bind(this)}
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

// updateBoard={this.updateBoard.bind(this)} nonAi bind for call on updateBoard function