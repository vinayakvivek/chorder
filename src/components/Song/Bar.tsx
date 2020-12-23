import { Grid, IconButton, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import { useStores } from '../../hooks/store';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { Chord } from '../../models/chord';
import { Bar } from '../../models/bar';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import './style.css';

const filter = createFilterOptions<Chord>();

const useStyles = makeStyles((theme) => ({
  barButton: {
    width: "15px",
    height: "15px",
  },
  popupIndicator: {
    display: "none",
  },
  popper: {
    width: "100px",
  },
  input: {
    padding: 0,
    width: 100,
  },
  root: {
  }
}));

interface ChordBoxProps {
  chord: Chord
  isScale: boolean
}

export const ChordBox = ({ chord, isScale }: ChordBoxProps) => {
  const classes = useStyles();
  const store = useStores().serviceStore;

  return (
    <Autocomplete
      freeSolo
      size="small"
      value={chord}
      onChange={(event: any, newValue: Chord | string) => {
        if (newValue instanceof Chord) {
          chord.copyFrom(newValue);
          store.refresh();
        }
      }}
      onInputChange={(e, value) => {
        chord.updateFromString(value);
        if (isScale) {
          store.updateScaleChords();
        }
        store.refresh();
      }}
      fullWidth
      options={store.allChords}
      filterOptions={(options, params) => {
        params.inputValue = chord.label;
        return filter(options, params);
      }}
      disableClearable
      getOptionLabel={(option: Chord) => option.label}
      getOptionSelected={(option: Chord, value: Chord) => option.equals(value)}
      // groupBy={(option) => option.inScale ? 'In scale' : 'Others'}
      style={{ width: 100, padding: 0, }}
      renderInput={(params) => (
        <TextField {...params} className={classes.input} variant="outlined" />
      )}
      renderOption={(option) => (
        <div style={{
          backgroundColor: option.shouldHighlight ? "rgba(0, 255, 0, 0.3)" : "transparent",
          width: "100%",
          padding: "2px 0 2px 10px",
          // borderRadius: "5px"
        }}>
          <span>{option.label}</span>
        </div>
      )}
      classes={{
        popupIndicator: classes.popupIndicator,
        popper: classes.popper,
        root: classes.root,
      }}
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
    bar.addChord(new Chord(''));
    store.refresh();
  }

  const removeChord = () => {
    bar.removeLastChord();
    store.refresh();
  }

  return (
    <Grid container spacing={2} direction="row" style={{ margin: "5px 0" }}>
      {
        bar.chords.map((chord, index) => (
          <Grid item key={index}>
            <ChordBox chord={chord} isScale={false} />
          </Grid>
        ))
      }
      <Grid item>
        <Grid container direction="column">
          <IconButton aria-label="add-chord" size="small" onClick={addChord}>
            <AddCircle className={classes.barButton} />
          </IconButton>
          {
            bar.chords.length > 1 &&
            <IconButton aria-label="remove-chord" size="small" color="secondary" onClick={removeChord}>
              <RemoveCircle className={classes.barButton} />
            </IconButton>
          }
        </Grid>
      </Grid>
    </Grid>
  );
}

