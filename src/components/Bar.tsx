import { Divider, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useStores } from '../hooks/store';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Chord } from '../models/chord';
import { observer } from 'mobx-react';
import { Bar } from '../models/song';

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
  return (
    <Autocomplete
      value={chord}
      onChange={(event: any, newValue: Chord | null) => {
        if (newValue) {
          chord.copyFrom(newValue);
          console.log(store.sampleBar);
        }
      }}
      options={store.allChords}
      disableClearable
      getOptionLabel={(option: Chord) => option.label}
      getOptionSelected={(option: Chord, value: Chord) => option.equals(value)}
      style={{ width: 100 }}
      renderInput={(params) => <TextField {...params} variant="outlined" />}
    />
  )
}

interface BarBoxProps {
  bar: Bar
}

export const BarBox = ({ bar }: BarBoxProps) => {
  const divider = (
    <Grid item style={{ padding: 2 }}>
      <Divider style={{ width: 4 }} orientation="vertical" />
    </Grid>
  );

  return (
    <Grid container spacing={2}>
      { divider }
      { divider }
      {
        bar.chords.map((chord, index) => (
          <Grid item key={index}>
            <ChordBox chord={chord}/>
          </Grid>
        ))
      }
      { divider }
      { divider }
    </Grid>
  );
}

