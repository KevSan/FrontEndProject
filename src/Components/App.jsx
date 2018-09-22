import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Companies from './Companies';
import Form from './Form';
import Header from './Header';
import './App.css';

const App = () => (
  <div className="App">
    <Header />
    <div className="body">
      <Switch>
        <Route exact path="/" component={Form} />
        <Route path="/form" component={Form} />
        <Route path="/companies" component={Companies} />
      </Switch>
    </div>
  </div>
);

export default App;
