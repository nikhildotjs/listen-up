import axios from 'axios';

function getFriendsByUserName(userName) {
  return axios.get(`http://localhost:8000/friends/${userName}`)
    .then((response) => {
      return response.data;
    })
}

export { getFriendsByUserName };