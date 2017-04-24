import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

class Example extends React.Component {
  createNotification = (type) => {
    return () => {
      switch (type) {

        case 'success':
          NotificationManager.success(`Player ${this.props.winner} wins`, 'Congratulations', 3000);
          break;
        case 'warning':
          NotificationManager.warning('Play Again', 'Draw', 3000);
          break;

      }
    };
  };

  render() {
    return (
      <div>

        <button className='btn btn-success'
          onClick={this.createNotification('success')}>Success
        </button>
        <hr />
        <button className='btn btn-warning'
          onClick={this.createNotification('warning')}>Warning
        </button>
        <hr />

        <NotificationContainer />
      </div>
    );
  }
}

export default Example;