import { Button, createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { FirebaseAuthProvider, FirebaseAuthConsumer } from '@react-firebase/auth';
import firebase from 'firebase';
import React, { useEffect } from 'react';
import './App.css';
import Auth from './components/Auth';
import Song from './components/Song';
import { firebaseConfig } from './config';
import { googleSignIn, initialize, signOut } from './service/auth';

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
