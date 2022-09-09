import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import apiGravatar from '../services/apiGravatar';

class Header extends Component {
  state = {
    img: '',
  };

  componentDidMount() {
    const { email } = this.props;
    const img = apiGravatar(email);
    this.setState({ img });
  }

  render() {
    const { img } = this.state;
    const { name, assertions } = this.props;
    return (
      <div>
        <img data-testid="header-profile-picture" src={ img } alt="Avatar" />
        <p data-testid="header-player-name">{ name }</p>
        <span data-testid="header-score">{ assertions }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  assertions: state.player.assertions,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
