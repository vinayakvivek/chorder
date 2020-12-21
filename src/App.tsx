import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import './App.css';
import Song from './components/Song';

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
        <Song />
      </div>
    </ThemeProvider>
  );
}

export default App;
