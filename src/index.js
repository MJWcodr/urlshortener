import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'

// React components
    import LongApp from './components/LongShort/Long-App'; 

// Resources
import reportWebVitals from './reportWebVitals';

// Routing
const routes = (
  <Router basename="/shorturls">
    <Route path={`${process.env.PUBLIC_URL}/`} component={LongApp} />
  </Router>
);

ReactDOM.render(routes,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
