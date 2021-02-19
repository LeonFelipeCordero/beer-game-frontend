import { Typography, Paper, Divider, Grid, Button } from '@material-ui/core';
import React, { useState } from 'react';
import ApiClient from '../../api-client/ApiClient';
import { useHistory } from 'react-router-dom';

const FactoryDetails = (props) => {
  const [weeklySpecialProduction, setWeeklySpecialProduction] = useState(
    props.player.weeklySpecialProduction
  );
  const apiClient = new ApiClient();
  const history = useHistory();

  const changeWeeklyProduction = (amount) => {
    if (amount + props.player.weeklyProduction <= props.player.fullCapacity) {
      apiClient
        .updateFactory({
          id: props.player.id,
          weeklySpecialProduction: amount,
        })
        .then((factory) => {
          setWeeklySpecialProduction(amount);
        })
        .catch((error) => {
          console.log(error);
          history.push('/error');
        });
    }
  };

  return (
    <Paper className="paper-left" elevation={3}>
      <Typography>Factory details: {props.player.type}</Typography>
      <Divider></Divider>
      <Typography>ID: {props.player.id}</Typography>
      <Typography>
        Special beer backlog: {props.player.backlogSpecialBeer}
      </Typography>
      <Typography>Others backlog: {props.player.backlogOthers}</Typography>
      <Typography>
        Full production capacity: {props.player.fullCapacity}
      </Typography>
      <Typography>
        Weekly production: {props.player.weeklyProduction}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Typography>
            Weekly special production:
            {weeklySpecialProduction}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            type="submmit"
            onClick={() => changeWeeklyProduction(weeklySpecialProduction + 10)}
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
            onClick={() => changeWeeklyProduction(weeklySpecialProduction - 10)}
          >
            -
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FactoryDetails;
