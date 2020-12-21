import { Box, Button, Dialog, DialogActions, DialogTitle, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useStores } from '../hooks/store';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteSong, getAllSongs, getSong } from '../service/db';

const SongList = () => {

  const { serviceStore } = useStores();
  const songs = serviceStore.allSongs;

  useEffect(() => {
    getAllSongs();
  }, []);

  const showSong = async (id: string) => {
    serviceStore.setSong(await getSong(id));
    serviceStore.showSongData();
  }

  const createSong = () => {
    serviceStore.createSong();
    serviceStore.showSongData();
  }

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  }
  const handleDelete = async () => {
    if (deleteId !== null) {
      const err = await deleteSong(deleteId);
      console.log(err);
    }
    setDeleteOpen(false);
    getAllSongs();
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
                <IconButton edge="end" aria-label="delete" onClick={() => {
                  setDeleteId(s.id);
                  setDeleteOpen(true);
                }}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        }
      </List>
      <Box m={5} />
      <Button variant="contained" onClick={createSong}>Create a new Song</Button>

      <Dialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="delete-confirm"
      >
        <DialogTitle id="delete-confirm">{"Delete this song?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default observer(SongList);

