import { Box, Button, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from "react";
import { useStores } from '../hooks/store';
import { Line } from '../models/song';
import { LineBox } from './Bar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

const Song = observer(() => {
  const store = useStores().serviceStore;
  const addLine = () => {
    store.song.addLine(new Line([], 1));
    store.refresh();
  }
  const removeLine = () => {
    store.song.removeLastLine();
    store.refresh();
  }
  return (
    <Box>
      <Grid container spacing={3} direction="column">
        <span style={{ display: "none" }}>{store.refreshCounter}</span>
        {
          store.song.lines.map((line, index) => (
            <Grid item key={index}>
              <LineBox line={line} />
            </Grid>
          ))
        }
        <Grid item>
          <Box my={1} />
          <Grid container direction="row">
            <Button aria-label="add-line" size="small" onClick={addLine}>
              Add a line
            </Button>
            <Box m={1} />
            {
              store.song.lines.length > 1 &&
              <Button aria-label="remove-line" size="small" color="secondary" onClick={removeLine}>
                Remove last line
              </Button>
            }
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
});

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
