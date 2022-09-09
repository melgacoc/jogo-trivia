import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Clock from '../components/Clock';
import Header from '../components/Header';
import apiQuestions from '../services/apiQuestions';
import '../styles/Game.css';

const INDEX_RANDOM = 0.5;

class Game extends Component {
  state = {
    questions: [],
    indexQuestion: 0,
    answers: [],
    correctAnswer: '',
    renderColor: false,
    timeIsExpired: false,
  };

  async componentDidMount() {
    const questions = await apiQuestions();
    if (!questions.length) {
      localStorage.removeItem('token');
      const { history } = this.props;
      history.push('/');
    } else {
      const answers = [questions[0].correct_answer, ...questions[0].incorrect_answers];
      this.setState({
        questions,
        answers: this.shuffleArray(answers),
        correctAnswer: questions[0].correct_answer,
      });
    }
  }

  // https://teamtreehouse.com/community/return-mathrandom05
  shuffleArray = (answers) => answers.sort(() => Math.random() - INDEX_RANDOM);

  handleClick = () => {
    this.setState({ renderColor: true });
  };

  changeColor = (isCorrect) => (isCorrect ? 'correctAnswer' : 'incorrectAnswer');

  handleExpired = () => {
    this.setState({ timeIsExpired: true });
  };

  render() {
    const { questions, answers, correctAnswer, indexQuestion, renderColor,
      timeIsExpired } = this.state;
    const question = questions[indexQuestion];
    return (
      <section>
        <Header />
        <Clock handleExpired={ this.handleExpired } />
        {
          question && (
            <div>
              <p data-testid="question-category">{question.category}</p>
              <p data-testid="question-text">{question.question}</p>
              <div data-testid="answer-options">
                {
                  answers.map((answer, index) => (
                    <button
                      type="button"
                      key={ answer }
                      className={ renderColor
                        ? this.changeColor(answer === correctAnswer)
                        : undefined }
                      data-testid={ answer === correctAnswer
                        ? 'correct-answer' : `wrong-answer-${index}` }
                      onClick={ () => this.handleClick(answer, correctAnswer) }
                      disabled={ timeIsExpired }
                    >
                      {answer}
                    </button>
                  ))
                }
              </div>
            </div>
          )
        }
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
