import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

// React components
    import App from './Long-App'; 

// Resources
import './css/index.css';
import reportWebVitals from './reportWebVitals';

// Routing
const routes = (
  <Router>
    <Route exact path="/shorturls" component={App}></Route>
  </Router>
);

ReactDOM.render(routes,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
