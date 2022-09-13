import { findByTestId, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { BTN_NEXT, BTN_PLAY, CORRECT_ANSWER, EMAIL_INPUT, EMAIL_TYPE, NAME_INPUT, NAME_TYPE } from './helpers/constants';
import questionsMock from './helpers/questionsMock';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const questions = {
  response_code: 0,
  results: questionsMock,
}

const correctAnswers = ['John', 'Mitochondria', 'False', 'Hopkins', 'Restoration'];
const wrongAnswers = ['Paul', 'Ribosome', 'True', 'Smith', 'Restoration'];

describe('Feedback page', () => {
  beforeEach(async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questions),
    }));

    renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), EMAIL_TYPE);
    userEvent.type(screen.getByTestId(NAME_INPUT), NAME_TYPE);
    userEvent.click(screen.getByTestId(BTN_PLAY));
  });
  
  test('O score é 100, e ao acertar menos de 3 perguntas a mensagem é "Could be better..."', () => {
    wrongAnswers.forEach((wrongAnswer) => {
      userEvent.click(screen.getByRole('button', { name: wrongAnswer }));
      userEvent.click(screen.getByTestId(BTN_NEXT));
    });
    
    expect(screen.getByTestId('feedback-total-score').innerHTML).toBe('100');
    expect(screen.getByTestId('feedback-total-question').innerHTML).toBe('1');
    expect(screen.getByTestId('feedback-text').innerHTML).toBe('Could be better...');
  });
  
  describe('Casos de respostas corretas', () => {
    beforeEach(() => {
      correctAnswers.forEach((correctAnswer) => {
        userEvent.click(screen.getByRole('button', { name: correctAnswer }));
        userEvent.click(screen.getByTestId(BTN_NEXT));
      });
    });    

    test('O score é 320, e ao acertar mais de 3 perguntas a mensagem é "Well Done!"', () => {
      expect(screen.getByTestId('feedback-text').innerHTML).toBe('Well Done!');
      expect(screen.getByTestId('feedback-total-question').innerHTML).toBe('5');
      expect(screen.getByTestId('feedback-total-score').innerHTML).toBe('320');
    });
    
    test('Está presente os botões de "Play Again" e o de "Ranking"', () => {  
      expect(screen.getByTestId('btn-play-again')).toBeInTheDocument();
      expect(screen.getByTestId('btn-ranking')).toBeInTheDocument();
    });

    test('Ao clicar no botão "Play Again" é redirecionada para a tela de login', () => {
      userEvent.click(screen.getByTestId('btn-play-again'));
      expect(screen.getByTestId(EMAIL_INPUT)).toBeInTheDocument();
      expect(screen.getByTestId(NAME_INPUT)).toBeInTheDocument();
    });

    test('Ao clicar no botão "Ranking" é redirecionada para a tela de ranking', () => {
      userEvent.click(screen.getByTestId('btn-ranking'));
      expect(screen.getByTestId('ranking-title')).toBeInTheDocument();
    });
  })
});
