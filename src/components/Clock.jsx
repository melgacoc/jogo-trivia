import PropTypes from 'prop-types';
import React, { Component } from 'react';

const START_COUNT = 5;
const DECREMENT_COUNT_SECOND = 1;
const DECREMENT_COUNT_MILISECONDS = 1000;

class Clock extends Component {
  state = {
    currentCount: START_COUNT,
  };

  componentDidMount() {
    this.intervalId = setInterval(this.timer, DECREMENT_COUNT_MILISECONDS);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  timer = () => {
    const { currentCount } = this.state;
    const { handleExpired } = this.props;
    this.setState({
      currentCount: currentCount === 0 ? 0 : currentCount - DECREMENT_COUNT_SECOND,
    });
    if (currentCount < DECREMENT_COUNT_SECOND) {
      clearInterval(this.intervalId);
    }
    if (currentCount === 1) {
      handleExpired();
    }
  };

  render() {
    const { currentCount } = this.state;
    return (
      <div>{currentCount}</div>
    );
  }
}

Clock.propTypes = {
  handleExpired: PropTypes.func.isRequired,
};

export default Clock;
