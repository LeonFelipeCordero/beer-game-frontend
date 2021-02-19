import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import ApiClinet from '../api-client/ApiClient';
import {
  updatePlayer,
  updateSession,
  setPlayerType,
} from '../storage/actions/index';
import { useHistory } from 'react-router-dom';
import AuthError from '../errors/authError';

const EnterPage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(undefined);
  const [authError, setAuthError] = useState(undefined);
  const apiClient = new ApiClinet();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.id === 'new') {
      apiClient
        .createNewSession(newName, newPassword)
        .then((session) => dispatch(updateSession(session)))
        .then(() => dispatch(setPlayerType(undefined)))
        .then(() => history.push('/players'))
        .catch((error) => setError(error.message));
    } else {
      apiClient
        .login(name, password)
        .then((session) => dispatch(updateSession(session)))
        .then(() => dispatch(updatePlayer(undefined)))
        .then(() => history.push('/players'))
        .catch((error) => {
          if (error instanceof AuthError) {
            setAuthError(error.message);
          } else {
            setError(error.message);
          }
        });
    }
  };

  const handleChange = (event) => {
    switch (event.target.id) {
      case 'newName':
        setNewName(event.target.value);
        break;
      case 'newPassword':
        setNewPassword(event.target.value);
        break;
      case 'name':
        setName(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>The Beer Game</h1>
      {error && (
        <Typography color="error" component="h3" variant="h4">
          {error}
        </Typography>
      )}
      <Grid container spacing={6} style={{ flexGrow: 1 }}>
        <Grid container item xs={6} className="grid">
          <Paper className="paper-left" elevation={3}>
            <Typography component="h1" variant="h5">
              New Game
            </Typography>
            <form id="new" onSubmit={handleSubmit}>
              <TextField
                id="newName"
                label="Name"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={newName}
                onChange={handleChange}
              />
              <TextField
                id="newPassword"
                type="password"
                label="Password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={newPassword}
                onChange={handleChange}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submmit"
              >
                Create new Game
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid container item xs={6} className="grid">
          <Paper className="paper-left" elevation={3}>
            <Typography component="h1" variant="h5">
              Join Game
            </Typography>
            <form id="join" onSubmit={handleSubmit}>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={name}
                onChange={handleChange}
              />
              <TextField
                id="password"
                type="password"
                label="Password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={password}
                onChange={handleChange}
              />
              {authError && (
                <Typography color="error" component="h3" variant="h6">
                  {authError}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submmit"
              >
                Login
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default EnterPage;
