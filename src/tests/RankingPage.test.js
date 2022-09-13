import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import {
  BTN_NEXT, BTN_PLAY, EMAIL_INPUT, EMAIL_TYPE, NAME_INPUT, NAME_TYPE
} from './helpers/constants';
import questionsMock from './helpers/questionsMock';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const questions = {
  response_code: 0,
  results: questionsMock,
}


describe('Ranking Page é exibida corretamente', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questions),
    }));

    renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId(EMAIL_INPUT), EMAIL_TYPE);
    userEvent.type(screen.getByTestId(NAME_INPUT), NAME_TYPE);
    userEvent.click(screen.getByTestId(BTN_PLAY));
  });
  test('Para um usuário', () => {

  for(let i = 0; i < 5; i += 1) {
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId(BTN_NEXT));
  }
  expect(screen.getByTestId('feedback-text')).toBeInTheDocument();
  expect(screen.getByTestId('btn-ranking')).toBeInTheDocument();

  userEvent.click(screen.getByTestId('btn-ranking'));

  expect(screen.getByTestId('ranking-title')).toBeInTheDocument();
  expect(screen.getByTestId('btn-go-home')).toBeInTheDocument();
  expect(screen.getByTestId('player-name-0')).toBeInTheDocument();
  expect(screen.getByTestId('player-score-0')).toBeInTheDocument();
  expect(screen.getByTestId('ranking-title')).toBeInTheDocument();

  userEvent.click(screen.getByTestId('btn-go-home'));

  expect(screen.getByTestId('btn-play')).toBeInTheDocument();
  });
});