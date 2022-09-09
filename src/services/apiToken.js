const urlToken = 'https://opentdb.com/api_token.php?command=request';

const apiToken = async () => {
  const response = await fetch(urlToken);
  const token = await response.json();
  return token;
};

export default apiToken;
