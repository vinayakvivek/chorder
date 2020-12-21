import { Box, Button, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../hooks/store';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import DeleteIcon from '@material-ui/icons/Delete';
import { getSong } from '../service/db';

const SongList = () => {

  const { serviceStore } = useStores();
  const songs = serviceStore.allSongs;

  const showSong = async (id: string) => {
    serviceStore.setSong(await getSong(id));
    serviceStore.showSongData();
  }

  const createSong = () => {
    serviceStore.createSong();
    serviceStore.showSongData();
  }

  return (
    <div>
      <h2>Your songs</h2>
      <List>
        {
          songs.map(s => (
            <ListItem key={s.id} button onClick={() => showSong(s.id)}>
              <ListItemIcon>
                <MusicNoteIcon />
              </ListItemIcon>
              <ListItemText primary={s.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        }
      </List>
      <Box m={5}/>
      <Button variant="contained" onClick={createSong}>Create a new Song</Button>
    </div>
  )
}

export default observer(SongList);

