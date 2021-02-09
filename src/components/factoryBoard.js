import { Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import PlayerDetails from './playerDetails';
import OrdersTable from './ordersTable';
import ApiClient from '../api-client/ApiClient';
import { useHistory } from 'react-router-dom';

const FactoryBoard = (props) => {
  const apiClient = new ApiClient();
  const history = useHistory();

  const createOrder = (event) => {
    apiClient
      .createNewOrder(props.session.id, 'FactoryOrder')
      .catch(() => history.push('/error'));
  };

  return (
    <div>
      <Grid container spacing={2} className="players-list">
        <Grid item xs={6}>
          <PlayerDetails
            player={props.player}
            playerType={props.playerType}
          ></PlayerDetails>
        </Grid>
        <Grid>
          <Button variant="contained" color="primary" fullWidth type="submmit">
            Increase capacity
          </Button>
        </Grid>
      </Grid>
      <OrdersTable
        orders={props.player.orders
          .filter((order) => order.status !== 'OnDelay')
          .sort((a, b) => {
            const aDate = new Date(a.datetime);
            const bDate = new Date(b.datetime);
            return bDate - aDate;
          })}
        disableButton={false}
        title="Pending orders"
        session={props.session}
      ></OrdersTable>
    </div>
  );
};

export default FactoryBoard;
