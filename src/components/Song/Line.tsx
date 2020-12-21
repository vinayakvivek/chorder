import { Box, Button, Divider, Grid, IconButton, makeStyles, Menu, MenuItem, TextField } from '@material-ui/core';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import React, { Fragment, useState, useEffect } from 'react';
import { useStores } from '../../hooks/store';
import { Bar } from '../../models/bar';
import { Line } from '../../models/line';
import { BarBox } from './Bar';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles((theme) => ({
  lyricsText: {
    // backgroundColor: "red",
    height: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  moreButton: {
    padding: '0px',
    width: '10px',
  }
}));


interface LineBoxProps {
  lineIndex: number,
  line: Line
}

export const LineBox = ({ lineIndex, line }: LineBoxProps) => {
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
  const [repeat, setRepeat] = useState(line.repeatCount);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  useEffect(() => {
    line.setRepeatCount(repeat);
  }, [line, repeat]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const insertLineAbove = () => {
    store.song.addNewLineAbove(lineIndex);
    store.refresh();
    handleClose();
  }

  const removeLine = () => {
    store.song.removeLine(lineIndex);
    store.refresh();
    handleClose();
  }

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid container>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.moreButton}>
          <MoreVertIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={insertLineAbove}>Insert line above</MenuItem>
          <MenuItem onClick={removeLine}>Remove this line</MenuItem>
        </Menu>

        {divider}
        {
          line.bars.map((bar, index) => (
            <Fragment key={index}>
              <Grid item>
                <BarBox bar={bar} />
              </Grid>
              {divider}
            </Fragment>
          ))
        }

        <Grid item>
          <Grid container direction="row" alignItems="center">
            <IconButton aria-label="add-bar" size="small" onClick={addBar}>
              <AddCircle />
            </IconButton>
            {
              line.bars.length > 0 &&
              <IconButton aria-label="remove-bar" size="small" color="secondary" onClick={removeBar}>
                <RemoveCircle />
              </IconButton>
            }
            <Box mx={2} />
            <TextField
              type="number"
              size="medium"
              value={repeat}
              onChange={(e) => setRepeat(parseInt(e.target.value))}
              InputProps={{
                inputProps: {
                  max: 10, min: 1
                }
              }}
              label="repeat"
            />
            <Box mx={2} />
            <Button onClick={() => {
              line.toggleShowLyrics();
              store.refresh();
            }}>
              {line.showLyrics ? 'Hide lyrics' : 'Show lyrics'}
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
