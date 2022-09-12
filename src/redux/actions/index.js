export const LOGIN = 'LOGIN';
export const RESETTIME = 'RESETTIME';
export const SCORE = 'SCORE';

export const userAction = (name, email) => ({
  type: LOGIN,
  payload: { name, email },
});

export const resetTime = (itToReset) => ({
  type: RESETTIME,
  payload: itToReset,
});

export const addToScoreAction = (payload) => ({
  type: SCORE,
  payload,
});
