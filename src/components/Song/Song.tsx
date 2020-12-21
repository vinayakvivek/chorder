import { Box, Button, Grid, makeStyles, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from "react";
import { useStores } from '../../hooks/store';
import { Line } from '../../models/line';
import { exportPdfFile, generateHtmlFromSong } from '../../utils';
import { LineBox } from './Line';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { createSong, saveSong } from '../../service/db';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  songNameTextField: {
    width: 300,
  },
  bigFont: {
    fontSize: 24,
    height: 10,
    padding: 15,
  },
  iconButton: {
    padding: "5px",
    width: "30px",
    borderRadius: "5em"
  }
}));

const Song = () => {
  const classes = useStyles();
  const store = useStores().serviceStore;
  const song = store.song;
  const allNames = store.allSongs.filter(s => s.id !== song.id).map(s => s.name);

  const [nameError, setNameError] = useState('');

  const validateName = () => {
    console.log(allNames);
    setNameError('');
    const name = song.name.trim();
    if (!name.length) {
      setNameError('Name cannot be empty');
      return false;
    }
    if (allNames.includes(name)) {
      setNameError('Name already exists, choose a different one');
      return false;
    }
    return true;
  }

  const exportPdf = () => {
    const html = generateHtmlFromSong(song);
    exportPdfFile(`${song.name}.html`, html);
  }

  const save = () => {
    if (validateName()) {
      saveSong(song);
    }
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
    validateName();
  }, [song, name]);

  return (
    <div>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item>
          <Grid container direction="row" alignItems="center">

            <TextField
              className={classes.songNameTextField}
              InputProps={{
                classes: {
                  input: classes.bigFont,
                },
              }}
              value={name}
              variant="filled"
              helperText={nameError}
              error={!!nameError}
              onChange={(e) => setName(e.target.value)}
            />
            <Box mx={2} />
            <Button className={classes.iconButton} variant="outlined" size="small" onClick={() => transpose(true)}><AddIcon /></Button>
            <Box mx={1} />
            <Button className={classes.iconButton} variant="outlined" size="small" onClick={() => transpose(false)}><RemoveIcon /></Button>
          </Grid>
        </Grid>
        <Box mx={2} />
        <Grid item>
          <Grid container direction="row" alignItems="center">
            <Button variant="contained" onClick={save}>Save</Button>
            <Box mx={2} />
            <Button variant="contained" onClick={exportPdf}>Export</Button>
          </Grid>
        </Grid>
      </Grid>
      <Box m={5} />

      <Box>
        <Grid container spacing={3} direction="column">
          <span style={{ display: "none" }}>{store.refreshCounter}</span>
          <Box mx={2} />
          {
            store.song.lines.map((line, index) => (
              <Grid item key={index}>
                <LineBox lineIndex={index} line={line} />
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
