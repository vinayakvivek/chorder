import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from "react";
import { Chord, ChordType } from '../models/chord';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Line = () => {
  const chords = [
    new Chord(0, ChordType.major),
    new Chord(3, ChordType.major),
    new Chord(4, ChordType.minor),
    new Chord(0, ChordType.empty),
  ]

  const renderChords = () => (
    chords.map((chord, index) => (
      <span key={index}>{chord.isEmpty ? '' : chord.label} |</span>
    ))
  )

  return (
    <div className='line'>
      || { renderChords()} ||
    </div>
  )
}

const Song = () => {
  const classes = useStyles();
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
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
