import { Box, Button, Divider, Grid, IconButton, makeStyles, TextField } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { useStores } from '../hooks/store';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Chord, ChordType } from '../models/chord';
import { observer } from 'mobx-react';
import { Bar, Line } from '../models/song';
import { AddCircle, RemoveCircle } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
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

  const addChord = () => {
    bar.addChord(new Chord(0, ChordType.empty));
    store.refresh();
  }

  const removeChord = () => {
    bar.removeLastChord();
    store.refresh();
  }

  return (
    <Grid container spacing={2}>
      {
        bar.chords.map((chord, index) => (
          <Grid item key={index}>
            <ChordBox chord={chord} />
          </Grid>
        ))
      }
      <Grid item>
        <IconButton aria-label="add-chord" size="small" onClick={addChord}>
          <AddCircle />
        </IconButton>
        {
          bar.chords.length > 1 &&
          <IconButton aria-label="remove-chord" size="small" onClick={removeChord}>
            <RemoveCircle />
          </IconButton>
        }
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
        <IconButton aria-label="add-bar" onClick={addBar}>
          <AddCircle />
        </IconButton>
        {
          line.bars.length > 0 &&
          <IconButton aria-label="remove-bar" onClick={removeBar}>
            <RemoveCircle />
          </IconButton>
        }
      </Grid>
    </Grid>
  );
}
