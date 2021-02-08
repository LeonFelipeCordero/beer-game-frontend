import { Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import PlayerDetails from './playerDetails';
import ApiClient from '../api-client/ApiClient';
import { updatePlayer, updateSession } from '../storage/actions';
import OrdersTable from './ordersTable';
import { useHistory } from 'react-router-dom';

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

  const orderType = () => {
    switch (playerType) {
      case 'Retailer':
        return 'WholesalerOrder';
      case 'Wholesaler':
        return 'DistributorOrder';
      case 'Distributor':
        return 'FactoryOrder';
    }
  };

  const createOrder = (event) => {
    apiClient
      .createNewOrder(session.id, orderType())
      .catch(() => history.push('/error'));
  };

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
          <Grid container spacing={2} className="players-list">
            <Grid item xs={6}>
              <PlayerDetails player={player}></PlayerDetails>
            </Grid>
            <Grid>
              {playerType != 'Factory' && (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submmit"
                  onClick={(event) => createOrder(event)}
                >
                  Create new order
                </Button>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2} className="players-list">
            <Grid item xs={6}>
              <OrdersTable
                orders={player.sendingOrders
                  .filter((order) => order.status !== 'OnDelay')
                  .sort((a, b) => {
                    const aDate = new Date(a.datetime);
                    const bDate = new Date(b.datetime);
                    return bDate - aDate;
                  })}
                disableButton={false}
                title="Pending orders"
                session={session}
              ></OrdersTable>
            </Grid>
            <Grid item xs={6}>
              <OrdersTable
                orders={player.receivingOrders.sort((a, b) => {
                  const aDate = new Date(a.datetime);
                  const bDate = new Date(b.datetime);
                  return bDate - aDate;
                })}
                disableButton={true}
                title="Created orders"
                session={session}
              ></OrdersTable>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Board;
