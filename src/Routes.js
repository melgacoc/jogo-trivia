import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/game" render={ (props) => <Game { ...props } /> } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      </Switch>
    );
  }
}

export default Routes;
