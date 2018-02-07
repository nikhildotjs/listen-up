import Promise from 'bluebird';
import axios from 'axios';
import _ from 'lodash';
import { getFriendsByUserName } from '../api/friends-api';
import { getPlaysByUserName } from '../api/plays-api';

export default function(req, res, next) {
  const userName = req.params.username;

  const requests = [
    getFriendsByUserName(userName),
    getPlaysByUserName(userName)
  ];

  Promise.all(requests)
    .then(([friendsData, playsData]) => {
      const uniqueTracks = _.uniq(playsData.plays);

      res.send({
        username: userName,
        plays: playsData.plays.length,
        friends: friendsData.friends.length,
        tracks: uniqueTracks.length,
        tracklist: uniqueTracks,
        uri: `/users/${userName}`
      });
    })
    .catch((err) => {
      const statusCode = (err.response && err.response.status) || 500;
      const statusText = (err.response && err.response.statusText) || 'ECONNREFUSED';

      res.status(statusCode).send({
        username: userName,
        message: `User information could not be retrieved: ${statusText}`,
        statusCode
      });
    });
}