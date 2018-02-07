import React from 'react';
import _ from 'lodash';
import styles from './styles.css';

const USER_IMAGES = ['👨🏻', '👨🏼', '👨🏽', '👨🏽', '👨🏾', '👨🏿', '👩🏻', '👩🏼', '👩🏽', '👩🏾', '👩🏿'];

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  /* Generate a random but consistent emoji for each user */
  getUserImage() {
    const userName = this.props.user.username;
    return USER_IMAGES[(userName.charCodeAt(0) - userName.length) % USER_IMAGES.length];
  }

  render() {
    if (this.props.showError) {
      return (
        <div>We were unable to locate the user you searched for.</div>
      );
    } else if (this.props.user) {
      const trackList = _.map(this.props.user.tracklist, (track, index) => {
        return (
          <li key={index} className={styles.track}>{track}</li>
        );
      });

      const formattedUserName = _.map(this.props.user.username.split('_'), name => _.capitalize(name)).join(' ');

      return (
        [
          <h3 className={styles.heading} key='userheader'>
            Username: {formattedUserName} ({this.props.user.username})
          </h3>,

          <div className={styles.content} key='usercontent'>
            <div className={styles.details}>
              <div className={styles.image}>
                {this.getUserImage()}
              </div>
              <div className={styles.metrics}>
                <div>
                  {this.props.user.plays} plays
                </div>
                <div>
                  {this.props.user.tracks} tracks
                </div>
              </div>
            </div>
            <div className={styles.tracks}>
              <h3 className={styles.heading}>Tracks</h3>
              <ul>
                {trackList}
              </ul>
            </div>
          </div>
        ]
      );
    } else {
      return null;
    }
  }
}

export default UserInfo;