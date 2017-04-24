import React, { Component } from 'react';

export default class Announcement extends Component {

  render() {
    return (
      <div className={this.props.winner ? 'visible' : 'hidden'}>
        <h2><span>{this.props.winner}</span></h2>
      </div >
    );
  }
}