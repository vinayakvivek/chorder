import { Box, Button, Divider, Grid } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useStores } from '../hooks/store';
import { signOut } from '../service/auth';
import { getAllSongs } from '../service/db';
import Song from './Song/Song';
import SongList from './SongList';

const Home = () => {

  useEffect(() => {
    getAllSongs();
  }, []);

  const { userStore } = useStores();
  return (
    <Box style={{ margin: "12px 30px" }}>
      <Grid
        container
        alignItems="center"
        justify="space-between"
        style={{ width: '100wh', height: '50px' }}
      >
        <h2>Chorder</h2>
        <Grid item>
          <Grid container alignItems="center">
            <h3>Hi {userStore.name}!</h3>
            <Box mx={3}/>
            <Button onClick={signOut} color="secondary">Sign Out</Button>
          </Grid>
        </Grid>
      </Grid>
      <Box m={2} />
      <Divider />
      <Box m={4} />
      {/* <Song /> */}
      <SongList/>
    </Box>
  )
}

export default observer(Home);
