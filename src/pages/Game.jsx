import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import apiQuestions from '../services/apiQuestions';

const INDEX_RANDOM = 0.5;

class Game extends Component {
  state = {
    questions: [],
    indexQuestion: 0,
    answers: [],
    correctAnswer: '',
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

  shuffleArray = (answers) => answers.sort(() => Math.random() - INDEX_RANDOM);

  render() {
    const { questions, answers, correctAnswer, indexQuestion } = this.state;
    const question = questions[indexQuestion];
    return (
      <section>
        <Header />
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
                      data-testid={ answer === correctAnswer
                        ? 'correct-answer' : `wrong-answer-${index}` }
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
