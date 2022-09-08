import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';

const TEST_EMAIL = 'email@teste.com';
const TEST_NAME = 'Nome de exemplo';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue((url) => {
      const urls = {
        'https://opentdb.com/api_token.php?command=request': () => {
          return simulateExpiredToken ? invalidTokenResponse : tokenResponse;
        },
        [`https://opentdb.com/api.php?amount=5&token=${tokenResponse.token}`]:
          () => questionsResponse,
        'https://opentdb.com/api.php?amount=5&token=INVALID_TOKEN': () =>
          invalidTokenQuestionsResponse,
      };

      return Promise.resolve({
        status: Object.keys(urls).includes(url) ? 200 : 404,
        ok: Object.keys(urls).includes(url),
        json: () => {
          return Object.keys(urls).includes(url)
            ? Promise.resolve(urls[url]())
            : Promise.reject(new Error('Not Found'));
        },
      });
    }),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Requisito 1', () => {
  test('Todos os inputs recebem valores', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');

    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();

    userEvent.type(emailInput, TEST_EMAIL);
    userEvent.type(nameInput, TEST_NAME);

    expect(emailInput).toHaveValue(TEST_EMAIL);
    expect(nameInput).toHaveValue(TEST_NAME);
  });

  describe('O comportamento do botão é o correto', () => {
    test('Quando apenas o email é digitado', () => {
      renderWithRouterAndRedux(<App />);

      const startBtn = screen.getByRole('button');
      const emailInput = screen.getByTestId('input-gravatar-email');

      expect(startBtn).toBeInTheDocument();
      expect(startBtn).toBeDisabled();

      userEvent.type(emailInput, TEST_EMAIL);
      expect(startBtn).toBeDisabled();
    });
    test('Quando apenas o nome é digitado', () => {
      renderWithRouterAndRedux(<App />);

      const startBtn = screen.getByRole('button');
      const nameInput = screen.getByTestId('input-player-name');

      expect(startBtn).toBeInTheDocument();
      expect(startBtn).toBeDisabled();

      userEvent.type(nameInput, TEST_NAME);
      expect(startBtn).toBeDisabled();
    });
    test('Quando todos os inputs são digitados', () => {
      renderWithRouterAndRedux(<App />);

      const startBtn = screen.getByRole('button');
      const nameInput = screen.getByTestId('input-player-name');
      const emailInput = screen.getByTestId('input-gravatar-email');

      expect(startBtn).toBeInTheDocument();
      expect(startBtn).toBeDisabled();

      userEvent.type(nameInput, TEST_NAME);
      userEvent.type(emailInput, TEST_EMAIL);
      expect(startBtn).not.toBeDisabled();
    });
  });
});

describe('Requisito 2', () => {
  test('O fetch é chamado', () => {
    renderWithRouterAndRedux(<App />);

    const startBtn = screen.getByRole('button');
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');

    userEvent.type(nameInput, TEST_NAME);
    userEvent.type(emailInput, TEST_EMAIL);
    userEvent.click(startBtn);

    expect(fetch).toHaveBeenCalled();
  });
});
