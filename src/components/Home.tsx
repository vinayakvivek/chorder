import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from "react";
import { useStores } from '../hooks/store';
import { BarBox } from './Bar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

const Song = () => {
  const classes = useStyles();
  const store = useStores().serviceStore;
  return (
    <Box>
      <Grid container spacing={3}>
        <BarBox bar={store.sampleBar}/>
      </Grid>
    </Box>
  )
}

const Home = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Box m={10} />
      <Typography variant="h4">
        My song
      </Typography>
      <Box m={5} />
      <Song />
    </Container>
  );
}

export default observer(Home);
