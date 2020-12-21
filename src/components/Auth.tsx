import { Button, Grid } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../hooks/store';
import { googleSignIn } from '../service/auth';
import Home from './Home';

const Auth = () => {
  const { userStore } = useStores();
  return (
    <div>
      {
        userStore.isSignedIn
          ? <Home />
          : (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: '70vh' }}
            >
              <Grid item xs={3}>
                <h3>Welcome to Chorder</h3>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={googleSignIn} color="secondary">
                  Sign In with Google
                </Button>
              </Grid>
            </Grid>
          )
      }
    </div>
  );
}

export default observer(Auth);
