export const LOGIN = 'LOGIN';

export const userAction = (name, email) => ({
  type: LOGIN,
  payload: { name, email },
});
