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
    givenAnswer: false,
    timeIsExpired: false,
  };

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    const questions = await apiQuestions();
    if (questions === undefined || !questions.length) {
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
  };

  // https://teamtreehouse.com/community/return-mathrandom05
  shuffleArray = (answers) => answers.sort(() => Math.random() - INDEX_RANDOM);

  handleClick = () => {
    this.setState({ givenAnswer: true });
  };

  changeColor = (isCorrect) => (isCorrect ? 'correctAnswer' : 'incorrectAnswer');

  handleExpired = () => {
    this.setState({ timeIsExpired: true });
  };

  nextQuestion = () => {
    this.setState((prevState) => {
      const indexQuestion = prevState.indexQuestion + 1;
      const answers = [
        prevState.questions[indexQuestion].correct_answer,
        ...prevState.questions[indexQuestion].incorrect_answers,
      ];
      return {
        givenAnswer: false,
        indexQuestion,
        answers: this.shuffleArray(answers),
        correctAnswer: prevState.questions[indexQuestion].correct_answer,
      };
    });
  };

  render() {
    const { questions, answers, correctAnswer, indexQuestion, givenAnswer,
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
                      className={ givenAnswer
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
                {
                  givenAnswer && (
                    <button
                      type="button"
                      data-testid="btn-next"
                      onClick={ this.nextQuestion }
                    >
                      Next
                    </button>
                  )
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
