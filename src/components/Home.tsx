import { Box, Button, Divider, Grid } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../hooks/store';
import { signOut } from '../service/auth';
import Song from './Song/Song';
import SongList from './SongList';

const Home = () => {

  const { userStore, serviceStore } = useStores();
  return (
    <Box style={{ margin: "12px 30px" }}>
      <Grid
        container
        alignItems="center"
        justify="space-between"
        style={{ width: '100wh', height: '50px' }}
      >
        <Grid item>
          <Grid container alignItems="center">
            <h2>Chorder</h2>
            <Box mx={3}/>
            {
              serviceStore.songView &&
              <Button onClick={() => serviceStore.showSongList()} variant="contained">My songs</Button>
            }
          </Grid>
        </Grid>
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
      {
        serviceStore.songView
          ? <Song/>
          : <SongList/>
      }
    </Box>
  )
}

export default observer(Home);
