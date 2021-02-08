import React from 'react';
import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
import ApiClient from '../api-client/ApiClient';
import { updatePlayer, setPlayerType } from '../storage/actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const PlayerSelectionCard = (props) => {
  const apiClient = new ApiClient();
  const dispatch = useDispatch();
  const history = useHistory();

  const registerPlayer = (event) => {
    event.preventDefaults;
    props.player.assigned = true;
    apiClient
      .updatePlayer(props.role.toLowerCase(), props.player)
      .then((selectedPlayer) => dispatch(updatePlayer(selectedPlayer)))
      .then(() => dispatch(setPlayerType(props.role)))
      .then(() => history.push('/board'))
      .catch(() => history.push('/error'));
  };

  if (props.player.assigned) {
    return (
      <Grid item xs={3}>
        <Paper
          className="paper-center"
          elevation={3}
          className="player-assigned-card"
        >
          <Typography>{props.role}</Typography>
          <Divider></Divider>
          <Typography>{props.player.id}</Typography>
          <Divider></Divider>
          <Typography>Assinged</Typography>
        </Paper>
      </Grid>
    );
  }
  return (
    <Grid item xs={3}>
      <Paper
        className="paper-center"
        elevation={6}
        className="player-free-card"
      >
        <Typography component="h5" variant="h5">
          {props.role}
        </Typography>
        <Divider></Divider>
        <Typography>{props.player.id}</Typography>
        <Divider></Divider>
        <Button
          className="player-selection-buton"
          fullWidth
          onClick={registerPlayer}
        >
          Free
        </Button>
      </Paper>
    </Grid>
  );
};

export default PlayerSelectionCard;
