import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Ranking extends Component {
  state = {
    isRedirect: false,
    ranking: [],
  };

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ ranking });
  }

  handleClick = () => {
    this.setState({ isRedirect: true });
  };

  render() {
    const { isRedirect, ranking } = this.state;
    const rankingSort = ranking.sort((a, b) => b.score - a.score);
    if (isRedirect) {
      return <Redirect to="/" />;
    }

    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          onClick={ this.handleClick }
          type="button"
          data-testid="btn-go-home"
        >
          Home
        </button>
        {
          rankingSort.map(({ name, score, picture }, index) => (
            <div key={ index }>
              <img src={ picture } alt="Avatar" />
              <p data-testid={ `player-name-${index}` }>{name}</p>
              <p data-testid={ `player-score-${index}` }>{score}</p>
            </div>
          ))
        }
      </section>
    );
  }
}

export default Ranking;
