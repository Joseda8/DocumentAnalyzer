import React from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from "./components/home/home";
import Files from "./components/files/index";

const theme = createMuiTheme({
  palette: {

    primary: {
      main: "#4A4A4A",
    }, 

    secondary: {
      main: '#FFFFFF'
    }

  }

});

function App() {

  return (
      <MuiThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/files" component={Files} />

              <Route component={Home} />
            </Switch>
          </Router>
      </MuiThemeProvider>
  );

}

export default App;


