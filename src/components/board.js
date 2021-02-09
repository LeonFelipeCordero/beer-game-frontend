import { Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import PlayerDetails from './playerDetails';
import ApiClient from '../api-client/ApiClient';
import { updatePlayer, updateSession } from '../storage/actions';
import OrdersTable from './ordersTable';
import { useHistory } from 'react-router-dom';
import PlayerBoard from './playerBoard';
import FactoryBoard from './factoryBoard';

const Board = (props) => {
  const apiClient = new ApiClient();
  const dispatch = useDispatch();
  const history = useHistory();
  const player = useSelector((state) => state.player.player);
  const playerType = useSelector((state) => state.player.type);
  const session = useSelector((state) => state.session.session);

  useEffect(() => {
    const interval = setInterval(() => {
      apiClient
        .getPlayer(playerType.toLowerCase(), player.id)
        .then((updatedPlayer) => {
          if (JSON.stringify(player) !== JSON.stringify(updatedPlayer)) {
            dispatch(updatePlayer(updatedPlayer));
          }
        })
        .catch((e) => console.log(e));
    }, 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      apiClient
        .getSession(session.id)
        .then((updatedSession) => {
          if (JSON.stringify(session) !== JSON.stringify(updatedSession)) {
            dispatch(updateSession(updatedSession));
          }
        })
        .catch((e) => console.log(e));
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div>
      <Typography component="h2" variant="h2">
        Board game
      </Typography>
      {!session.completed && (
        <Typography component="h2" variant="h2">
          Game is not ready, wating...
        </Typography>
      )}
      {session.completed && (
        <div>
          {playerType !== 'Factory' && (
            <PlayerBoard
              session={session}
              player={player}
              playerType={playerType}
            ></PlayerBoard>
          )}
          {playerType === 'Factory' && (
            <FactoryBoard
              session={session}
              player={player}
              playerType={playerType}
            ></FactoryBoard>
          )}
        </div>
      )}
    </div>
  );
};

export default Board;
