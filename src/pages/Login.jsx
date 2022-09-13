import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConfigurationButton from '../components/ConfigurationButton';
import { resetScore, userAction } from '../redux/actions';
import apiToken from '../services/apiToken';

class Login extends Component {
  state = {
    email: '',
    name: '',
    isDisabled: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resetScore());
  }

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
    const token = await apiToken();
    localStorage.setItem('token', token.token);
    const { history, dispatch } = this.props;
    const { name, email } = this.state;
    dispatch(userAction(name, email));
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
        <ConfigurationButton />
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
