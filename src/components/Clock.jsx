import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetTime } from '../redux/actions';

const START_COUNT = 30;
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

  getReset = () => {
    const { dispatch, itToResetTime } = this.props;
    dispatch(resetTime(!itToResetTime));
    this.setState({ currentCount: START_COUNT });
  };

  render() {
    const { currentCount } = this.state;
    const { itToResetTime } = this.props;
    if (itToResetTime) {
      this.getReset();
    }
    return (
      <div>{currentCount}</div>
    );
  }
}

Clock.propTypes = {
  handleExpired: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  itToResetTime: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  itToResetTime: state.game.resetTime,
});

export default connect(mapStateToProps)(Clock);
