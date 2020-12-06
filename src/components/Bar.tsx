import { Box, Divider, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { useStores } from '../hooks/store';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Chord } from '../models/chord';
import { observer } from 'mobx-react';
import { Bar, Line } from '../models/song';

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
  return (
    <Grid container spacing={2}>
      {
        bar.chords.map((chord, index) => (
          <Grid item key={index}>
            <ChordBox chord={chord} />
          </Grid>
        ))
      }
    </Grid>
  );
}

interface LineBoxProps {
  line: Line
}

export const LineBox = ({ line }: LineBoxProps) => {
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
  return (
    <Grid container>
      { divider}
      {
        line.bars.map((bar, index) => (
          <Fragment key={index}>
            <Grid item>
              <BarBox bar={bar} />
            </Grid>
            { divider }
          </Fragment>

        ))
      }
    </Grid>
  );
}
