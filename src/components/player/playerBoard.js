import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import PlayerDetails from './playerDetails';
import OrdersTable from '../ordersTable';
import ApiClient from '../../api-client/ApiClient';
import { useHistory } from 'react-router-dom';

const PlayerBoard = (props) => {
  const apiClient = new ApiClient();
  const history = useHistory();

  const orderType = () => {
    switch (props.playerType) {
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
      .createNewOrder(props.session.id, orderType())
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
        <Grid item xs={6}>
          <Paper className="paper-left" elevation={3}>
            <Typography>Actions</Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submmit"
              onClick={(event) => createOrder(event)}
            >
              Create new order
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <OrdersTable
        orders={props.player.sendingOrders
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
      <OrdersTable
        orders={props.player.receivingOrders.sort((a, b) => {
          const aDate = new Date(a.datetime);
          const bDate = new Date(b.datetime);
          return bDate - aDate;
        })}
        disableButton={true}
        title="Created orders"
        session={props.session}
      ></OrdersTable>
    </div>
  );
};

export default PlayerBoard;
