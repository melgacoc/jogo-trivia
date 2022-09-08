import PropTypes from 'prop-types';
import React, { Component } from 'react';
import apiToken from '../services/apiToken';

const MINIMO_LENGTH = 3;

class Login extends Component {
  state = {
    email: '',
    name: '',
    isDisabled: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.validationButton());
  };

  validationButton = () => {
    const { email, name } = this.state;
    const isDisabled = !(email.length > 0 && name.length > 0);
    this.setState({ isDisabled });
  };

  submitForm = async (event) => {
    event.preventDefault();
    try {
      const token = await apiToken();
      if (token.length < MINIMO_LENGTH) {
        throw new Error('Token expirado.');
      }
      localStorage.setItem('token', token.token);
    } catch (error) {
      const token = await apiToken();
      localStorage.setItem('token', token.token);
    }
    const { history } = this.props;
    history.push('/game');
  };

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <section>
        <form onSubmit={ this.submitForm }>
          <input
            type="text"
            name="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            value={ email }
            placeholder="Qual é o seu e-mail do gravatar?"
          />
          <input
            type="text"
            name="name"
            onChange={ this.handleChange }
            value={ name }
            data-testid="input-player-name"
            placeholder="Qual é o seu nome?"
          />
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ isDisabled }
          >
            Jogar
          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
