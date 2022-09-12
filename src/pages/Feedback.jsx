import { number } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
/* import store from '../redux/store'; */

class Feedback extends Component {
  showMessageFeedback = () => {
    const TRES = 3;
    const { score } = this.props;
    if (score >= TRES) return 'Well Done!';
    return 'Could be better...';
  };

  buttonPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <main>
          <p data-testid="feedback-text">{this.showMessageFeedback()}</p>
          <p data-testid="feedback-total-score">{ score }</p>
          <p data-testid="feedback-total-question">{ assertions }</p>
        </main>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.buttonPlayAgain }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: number,
  assertions: number,
}.isRequired;

const mapStateToProps = ({ playReducer }) => ({
  ...playReducer,
});

export default connect(mapStateToProps)(Feedback);
