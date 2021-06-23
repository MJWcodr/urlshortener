import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'

// React components
    import LongApp from './components/LongShort/Long-App'; 
    import linktree from './components/linktree/linktree';
// Resources
import reportWebVitals from './reportWebVitals';

// Routing
const routes = (
  <Router basename="/">
    <Route path={`${process.env.PUBLIC_URL}/shorturls`} component={LongApp} />
    <Route path={`${process.env.PUBLIC_URL}/link`} component={linktree} />
  </Router>
);

ReactDOM.render(routes,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
