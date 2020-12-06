import { Box, Divider, Grid, IconButton, makeStyles, TextField } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useStores } from '../hooks/store';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Chord, ChordType } from '../models/chord';
import { Bar, Line } from '../models/song';
import { AddCircle, RemoveCircle } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  barButton: {
    width: "15px",
    height: "15px",
  }
}));

interface ChordBoxProps {
  chord: Chord
}

export const ChordBox = ({ chord }: ChordBoxProps) => {
  const store = useStores().serviceStore;
  const width = chord.label.length > 2 ? 100 : 70;
  return (
    <Autocomplete
      size="small"
      value={chord}
      onChange={(event: any, newValue: Chord | null) => {
        if (newValue) {
          chord.copyFrom(newValue);
          store.refresh();
        }
      }}
      options={store.allChords}
      disableClearable
      getOptionLabel={(option: Chord) => option.label}
      getOptionSelected={(option: Chord, value: Chord) => option.equals(value)}
      style={{ width }}
      renderInput={(params) => <TextField {...params} variant="outlined" />}
    />
  )
}

interface BarBoxProps {
  bar: Bar
}

export const BarBox = ({ bar }: BarBoxProps) => {
  const store = useStores().serviceStore;
  const classes = useStyles();

  const addChord = () => {
    bar.addChord(new Chord(0, ChordType.empty));
    store.refresh();
  }

  const removeChord = () => {
    bar.removeLastChord();
    store.refresh();
  }

  return (
    <Grid container spacing={2} direction="row">
      {
        bar.chords.map((chord, index) => (
          <Grid item key={index}>
            <ChordBox chord={chord} />
          </Grid>
        ))
      }
      <Grid item>
        <Grid container direction="column">
          <IconButton aria-label="add-chord" size="small" onClick={addChord}>
            <AddCircle className={classes.barButton}/>
          </IconButton>
          {
            bar.chords.length > 1 &&
            <IconButton aria-label="remove-chord" size="small" color="secondary" onClick={removeChord}>
              <RemoveCircle className={classes.barButton}/>
            </IconButton>
          }
        </Grid>
      </Grid>
    </Grid>
  );
}

interface LineBoxProps {
  line: Line
}

export const LineBox = ({ line }: LineBoxProps) => {
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

  const addBar = () => {
    line.addBar(new Bar([
      new Chord(0, ChordType.empty),
    ]));
    store.refresh();
  }

  const removeBar = () => {
    line.removeLastBar();
    store.refresh();
  }

  return (
    <Grid container spacing={2}>
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
        <IconButton aria-label="add-bar" size="small" onClick={addBar}>
          <AddCircle />
        </IconButton>
        {
          line.bars.length > 0 &&
          <IconButton aria-label="remove-bar" size="small" color="secondary" onClick={removeBar}>
            <RemoveCircle />
          </IconButton>
        }
      </Grid>
    </Grid>
  );
}
