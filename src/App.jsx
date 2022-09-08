import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
    </Switch>
  );
}
