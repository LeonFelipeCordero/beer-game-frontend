import { combineReducers } from 'redux';
import session from './session';
import player from './player';

const allReducers = combineReducers({
  session: session,
  player: player,
});

export default allReducers;
