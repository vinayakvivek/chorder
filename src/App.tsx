import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import './App.css';
import Home from './components/Home';

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
