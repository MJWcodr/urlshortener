
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'

const linktree = React.lazy(() => import('./components/linktree/linktree'))
const LongApp = React.lazy(() => import('./components/LongShort/Long-App'))

// React components

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
