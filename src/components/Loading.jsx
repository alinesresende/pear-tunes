import React, { Component } from 'react';
import PearLoading from '../icons/pear-loading.svg';
import '../index.css';

class Loading extends Component {
  render() {
    return (
      <div className="loading-container">
        <img src={ PearLoading } alt="img-pear" className="style-loading loadin" />
      </div>
    );
  }
}

export default Loading;
