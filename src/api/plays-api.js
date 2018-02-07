import axios from 'axios';

function getPlaysByUserName(userName) {
  return axios.get(`http://localhost:8001/plays/${userName}`)
    .then((response) => {
      return response.data;
    })
}

export { getPlaysByUserName };