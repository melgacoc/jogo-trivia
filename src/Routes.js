import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/game" render={ (props) => <Game { ...props } /> } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/ranking" component={ Ranking } />
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route exact path="/feedback" component={ Feedback } />
      </Switch>
    );
  }
}

export default Routes;
