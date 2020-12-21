import { Button, createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { FirebaseAuthProvider, FirebaseAuthConsumer } from '@react-firebase/auth';
import firebase from 'firebase';
import React from 'react';
import './App.css';
import Song from './components/Song';
import { firebaseConfig } from './config';
import { googleSignIn, signOut } from './service/auth';

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
        <div className="App">
          <Button onClick={googleSignIn}>
            Sign In
          </Button>
          <Button onClick={signOut}>
            Sign Out
          </Button>
          <FirebaseAuthConsumer>
            {({ isSignedIn, user, providerId }) => {
              return (
                <pre style={{ height: 300, overflow: "auto" }}>
                  {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
                </pre>
              );
            }}
          </FirebaseAuthConsumer>
          {/* <Song /> */}
        </div>
      </FirebaseAuthProvider>
    </ThemeProvider>
  );
}

export default App;
