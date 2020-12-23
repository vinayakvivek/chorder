import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { useEffect } from 'react';
import Auth from './components/Auth';
import { initialize } from './service/auth';
import './App.css'

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

function App() {

  useEffect(() => {
    initialize();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Auth />
      </div>
    </ThemeProvider>
  );
}

export default App;
