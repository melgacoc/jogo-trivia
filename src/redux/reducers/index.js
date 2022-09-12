import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import playerReducer from './playerReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  game: gameReducer,
});

export default rootReducer;
