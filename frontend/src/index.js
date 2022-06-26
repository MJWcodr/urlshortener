
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import './styles/index.scss'

// import linktree from './components/linktree/linktree';

const LongApp = lazy(() => import('./components/LongShort/Long-App'))
const linktree = lazy(() => import('./components/linktree/linktree'))



const fallback = {
  "body": <body style={{background: "#303030"}}></body>,
}

// Resources

// Routing
const routes = (
  <Router basename="/">
    <Suspense fallback={fallback.body}>
      <Route exact path='/shorturls' component={LongApp} />
      <Route exact path='/' component={linktree} />
    </Suspense>
  </Router>
);

ReactDOM.render(routes,
  document.getElementById('root')
);
