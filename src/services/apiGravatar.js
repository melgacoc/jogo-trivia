import { MD5 } from 'crypto-js';

const getUrl = (hash) => `https://www.gravatar.com/avatar/${hash}`;

const apiGravatar = (email) => {
  const hash = MD5(email).toString();
  return getUrl(hash);
};

export default apiGravatar;
