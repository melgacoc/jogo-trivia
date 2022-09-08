import React, { Component } from 'react';

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
    console.log(email, name);
    const isDisabled = !(email.length > 0 && name.length > 0);
    this.setState({ isDisabled });
  };

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <section>
        <form>
          <input
            type="email"
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
            type="button"
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

export default Login;
