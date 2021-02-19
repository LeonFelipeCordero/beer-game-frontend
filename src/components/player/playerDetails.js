import { Typography, Paper, Divider, Grid, Button } from '@material-ui/core';
import React, { useState } from 'react';
import ApiClient from '../../api-client/ApiClient';
import { useHistory } from 'react-router-dom';

const playerDetails = (props) => {
  const [weeklyOrder, setWeeklyOrder] = useState(props.player.weeklyOrder);
  const apiClient = new ApiClient();
  const history = useHistory();

  const backlog = () => {
    switch (props.player.type) {
      case 'Retailer':
        return 'Beers';
      default:
        return 'Crates';
    }
  };

  const changeWeeklyOrder = (amount) => {
    apiClient
      .updatePlayer(props.player.type.toLowerCase(), {
        id: props.player.id,
        weeklyOrder: amount,
      })
      .then((player) => {
        setWeeklyOrder(player.weeklyOrder);
      })
      .catch((error) => {
        console.log(error);
        history.push('/error');
      });
  };

  return (
    <Paper className="paper-left" elevation={3}>
      <Typography>Player details: {props.player.type}</Typography>
      <Divider></Divider>
      <Typography>ID: {props.player.id}</Typography>
      <Typography>
        Backlog in {backlog()}: {props.player.backlog}
      </Typography>
      <Typography>
        Last order received: {props.player.lastOrderResult}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Typography>Weekly order: {weeklyOrder}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            type="submmit"
            onClick={() => changeWeeklyOrder(weeklyOrder + 1)}
          >
            +
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            type="submmit"
            onClick={() => changeWeeklyOrder(weeklyOrder - 1)}
          >
            -
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default playerDetails;
