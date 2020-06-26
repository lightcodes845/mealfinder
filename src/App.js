import React, { Component } from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import classes from './App.module.scss';

class App extends Component {
  state = {
    query: '',
    payload: [],
  };

  handleQuery = value => {
    this.setState({ query: value });
  };

  render() {
    return (
      <div className={classes.App}>
        <h1 className={classes.header}>Meal Finder</h1>
        <SearchForm query={this.state.query} change={this.handleQuery} />
      </div>
    );
  }
}

export default App;
