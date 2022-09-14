import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import {
  BTN_NEXT, BTN_PLAY, CORRECT_ANSWER, EMAIL_INPUT, EMAIL_TYPE,
  FEEDBACK_TEXT, FEEDBACK_TOTAL_QUESTION, FEEDBACK_TOTAL_SCORE, NAME_INPUT, NAME_TYPE
} from './helpers/constants';
import questionsMock from './helpers/questionsMock';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const questions = {
  response_code: 0,
  results: questionsMock,
}

jest.setTimeout(40000);

describe('Testes para a página de Game', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questions),
    }));

    renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), EMAIL_TYPE);
    userEvent.type(screen.getByTestId(NAME_INPUT), NAME_TYPE);
    userEvent.click(screen.getByTestId(BTN_PLAY));
  });

  test('A página deve conter uma categoria, a pegunta e as repostas da questão', () => {
    const { correct_answer: correctAnswer, 
    incorrect_answers: incorrectAnswers } = questionsMock[0];
    
    expect(screen.getByTestId('question-category')).toBeInTheDocument();
    expect(screen.getByTestId('question-text')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: correctAnswer })).toBeInTheDocument();
    incorrectAnswers.forEach((answer) => {
      expect(screen.getByRole('button', { name: answer })).toBeInTheDocument();
    });
  });
  
  test('Diminui o tempo do temporizador', async () => {
    await waitFor(() => expect(screen.getByTestId('timer-clock').innerHTML).toBe('29'));
  });

  test('Os botões de reposas são desabilitados após 30 segundos', async () => {
    await waitFor(() => expect(screen.getByTestId('correct-answer')).toBeDisabled(), { timeout: 32000 });
  });
});