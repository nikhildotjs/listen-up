import React from 'react';
import axios from 'axios';
import styles from './styles.css';
import SearchWidget from '../SearchWidget';
import UserInfo from '../UserInfo';

class ListenUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      showError: false
    };
  }

  searchHandler = (userId) => {
    axios.get(`/users/${userId}`)
      .then((response) => {
        this.setState({
          user: response.data,
          showError: false
        });
      })
      .catch((err) => {
        this.setState({
          showError: true
        });
      })
  }

  render() {
    return (
      <div className={styles.main}>
        <header className={styles.header}>
          <h1>🎧 Listen Up</h1>
        </header>
        <main className={styles.content}>
          <div className={styles.search}>
            <SearchWidget searchHandler={this.searchHandler} />
          </div>
          <div className={styles.results}>
            <UserInfo {...this.state} />
          </div>
        </main>
        <footer className={styles.footer}>
          Copyright Listen Up 2018
        </footer>
      </div>
    );
  }
}

export default ListenUp;