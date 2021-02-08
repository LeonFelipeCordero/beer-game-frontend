import React, { useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import PlayerSelectionCard from './playerSelectionCard';
import ApiClient from '../api-client/ApiClient';
import { updateSession } from '../storage/actions';
import { useHistory } from 'react-router-dom';

const PlayerSelection = (props) => {
  const apiClient = new ApiClient();
  const session = useSelector((state) => state.session.session);
  const player = useSelector((state) => state.player.player);
  const history = useHistory();
  const dispatch = new useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      apiClient
        .getSession(session.id)
        .then((updatedSession) => {
          if (JSON.stringify(session) !== JSON.stringify(updatedSession)) {
            dispatch(updateSession(updatedSession));
          }
        })
        .catch(() => history.push('/error'));
    }, 5000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (player) {
      history.push('/board');
    }
  });

  return (
    <div>
      <Typography component="h2" variant="h2">
        Player selection
      </Typography>
      <Grid container spacing={4} className="players-list">
        {session.players.map((player) => (
          <PlayerSelectionCard
            key={player.id}
            player={player}
            role={player.type}
          ></PlayerSelectionCard>
        ))}
        <PlayerSelectionCard
          player={session.factory}
          role="Factory"
        ></PlayerSelectionCard>
      </Grid>
    </div>
  );
};

export default PlayerSelection;
