import { Box, Button, Divider, Grid, IconButton, makeStyles, TextField } from '@material-ui/core';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import React, { Fragment, useState, useEffect } from 'react';
import { useStores } from '../hooks/store';
import { Bar } from '../models/bar';
import { Line } from '../models/line';
import { BarBox } from './Bar';


const useStyles = makeStyles((theme) => ({
  lyricsText: {
    // backgroundColor: "red",
    height: 20,
    marginTop: 10,
    marginBottom: 30,
  }
}));


interface LineBoxProps {
  line: Line
}

export const LineBox = ({ line }: LineBoxProps) => {
  const classes = useStyles();
  const store = useStores().serviceStore;
  const divider = (
    <Fragment>
      <Box m={1} />
      <Grid item style={{ padding: 2 }}>
        <Divider style={{ width: 4 }} orientation="vertical" />
      </Grid>
      <Grid item style={{ padding: 2 }}>
        <Divider style={{ width: 4 }} orientation="vertical" />
      </Grid>
      <Box m={1} />
    </Fragment>
  );

  const [lyrics, setLyrics] = useState(line.lyrics);

  useEffect(() => {
    line.setLyrics(lyrics);
  }, [line, lyrics]);

  const addBar = () => {
    line.addBar(Bar.init());
    store.refresh();
  }

  const removeBar = () => {
    line.removeLastBar();
    store.refresh();
  }

  return (
    <Grid container spacing={2} direction="column">
      <Grid container>
        { divider}
        {
          line.bars.map((bar, index) => (
            <Fragment key={index}>
              <Grid item>
                <BarBox bar={bar} />
              </Grid>
              { divider}
            </Fragment>
          ))
        }
        <Grid item>
          <Grid container direction="row">
            <IconButton aria-label="add-bar" size="small" onClick={addBar}>
              <AddCircle />
            </IconButton>
            {
              line.bars.length > 0 &&
              <IconButton aria-label="remove-bar" size="small" color="secondary" onClick={removeBar}>
                <RemoveCircle />
              </IconButton>
            }
            <Box mx={2}/>
            <Button onClick={() => {
              line.toggleShowLyrics();
              store.refresh();
            }}>
              { line.showLyrics ? 'Hide lyrics' : 'Show lyrics' }
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {
        line.showLyrics &&
        <TextField
          className={classes.lyricsText}
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          size="small"
        />
      }
    </Grid>
  );
}
