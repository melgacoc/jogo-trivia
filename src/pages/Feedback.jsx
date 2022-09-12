import { number } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
/* import store from '../redux/store'; */

class Feedback extends Component {
  showMessageFeedback = () => {
    const TRES = 3;
    const { assertions } = this.props;
    if (assertions >= TRES) return 'Well Done!';
    return 'Could be better...';
  };

  buttonPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  buttonPlayRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
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
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.buttonPlayRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: number,
  assertions: number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  ...player,
});

export default connect(mapStateToProps)(Feedback);
