import { Box, Divider, Grid, IconButton } from '@material-ui/core';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { useStores } from '../hooks/store';
import { Chord, ChordType } from '../models/chord';
import { Bar, Line } from '../models/song';
import { BarBox } from './Bar';

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
