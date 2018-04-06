import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from 'material-ui/AppBar';

import Examples from './components/Examples/Examples';
import BtnNav from './components/BottomNav/BtnNav';
import SearchPage from './components/BottomNav/SearchPage';
import ProfilePage from './components/BottomNav/ProfilePage';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <MuiThemeProvider>
            <img src="images/Status-Bar.png" width="100%" />
            <AppBar
              title="Example"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
              <Switch>
                <Route exact path="/" component={Examples} />
                <Route exact path="/search" component={SearchPage} />
                <Route exact path="/profile" component={ProfilePage} />
              </Switch>
            <BtnNav/>
          </MuiThemeProvider>
        </div>
      </Router>
    );
  }
}

export default App;
