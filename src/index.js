import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'

// React components
import LongApp from './components/LongShort/Long-App';
import linktree from './components/linktree/linktree';
// Resources

// Routing
const routes = (
  <Router basename="/">
    <Route exact path='/shorturls' component={LongApp} />
    <Route exact path='/' component={linktree} />
  </Router>
);

ReactDOM.render(routes,
  document.getElementById('root')
);
