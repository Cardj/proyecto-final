import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import NewtonInterpolation from './components/NewtonInterpolation';
import LagrangeInterpolation from './components/LagrangeInterpolation';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/newton" component={NewtonInterpolation} />
        <Route path="/lagrange" component={LagrangeInterpolation} />
      </Switch>
    </Router>
  );
};

export default App;
