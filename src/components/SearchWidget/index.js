import React from 'react';
import classNames from 'classnames';
import styles from './styles.css';

class SearchWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: null,
      searchButtonEnabled: false
    }
  }

  searchHandler = () => {
    if (this.state.searchButtonEnabled) {
      // Support searching by first name, last name combination without '_'
      const sanitizedQuery = this.state.searchQuery.trim().replace(/\s/g, '_').toLowerCase();
      this.props.searchHandler(sanitizedQuery);
    }
  }

  inputHandler = (e) => {
    const inputValue = e.target.value;

    this.setState({
      searchQuery: inputValue,
      searchButtonEnabled: !!inputValue
    });
  }

  render() {
    const buttonStyles = classNames(styles.button, { [styles.inactive]: !this.state.searchButtonEnabled });

    return (
      <div>
        <input type='text' placeholder='User Name' className={styles.input} onChange={this.inputHandler} aria-label='User Name' />
        <button onClick={this.searchHandler} className={buttonStyles}>Search User</button>
      </div>
    );
  }
}

export default SearchWidget;