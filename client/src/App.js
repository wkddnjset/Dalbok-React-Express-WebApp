import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import FloatBtn from './components/FloatBtn'
import HomePage from './components/HomePage/HomePage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import SigninPage from './components/SigninPage/SigninPage';
import SignupPage from './components/SignupPage/SignupPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div className="App">
            
              <img className="status-bar" src="images/Status-Bar.png" width="100%" alt=""/>
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/profile" component={ProfilePage} />
                  <Route path="/signin" component={SigninPage} />
                  <Route path="/signup" component={SignupPage} />
                </Switch>
                <FloatBtn/>
            
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
