const getUrl = (token) => `https://opentdb.com/api.php?amount=5&token=${token}`;

const apiQuestions = async () => {
  const url = getUrl(localStorage.getItem('token'));
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};

export default apiQuestions;
