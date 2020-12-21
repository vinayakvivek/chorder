import { Box, Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from "react";
import { useStores } from '../hooks/store';
import { Line } from '../models/line';
import { exportPdfFile, generateHtmlFromSong } from '../utils';
import { LineBox } from './Line';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  songNameTextField: {
    width: 500,
  },
  bigFont: {
    fontSize: 30,
  }
}));

const Song = () => {
  const classes = useStyles();
  const store = useStores().serviceStore;
  const song = store.song;

  const exportPdf = () => {
    const html = generateHtmlFromSong(song);
    exportPdfFile(`${song.name}.html`, html);
  }

  const transpose = (up: boolean) => {
    store.transpose(up);
  }

  const addLine = () => {
    store.song.addLine(Line.init());
    store.refresh();
  }

  const removeLine = () => {
    store.song.removeLastLine();
    store.refresh();
  }

  const [name, setName] = useState(song.name);
  useEffect(() => {
    song.setName(name);
  }, [song, name]);

  return (
    <div style={{ margin: "50px" }}>
      <Box m={10} />
      <Grid container direction="row">
        <Typography variant="h4">
          Song :
        </Typography>
        <Box mx={2} />
        <TextField
          className={classes.songNameTextField}
          InputProps={{
            classes: {
              input: classes.bigFont,
            },
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Box mx={2} />
        <Button variant="outlined" size="small" onClick={() => transpose(true)}><AddIcon/></Button>
        <Box mx={1} />
        <Button variant="outlined" size="small" onClick={() => transpose(false)}><RemoveIcon/></Button>
        <Box mx={2} />
        <Button variant="contained" onClick={exportPdf}>Export</Button>
      </Grid>
      <Box m={5} />

      <Box>
        <Grid container spacing={3} direction="column">
          <span style={{ display: "none" }}>{store.refreshCounter}</span>
          <Box mx={2} />
          {
            store.song.lines.map((line, index) => (
              <Grid item key={index}>
                <LineBox line={line} />
                <Box my={2} />
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

    </div>
  );
}

export default observer(Song);
