import React, { Component } from 'react';
import axios from 'axios';

import SearchForm from './components/SearchForm/SearchForm';
import classes from './App.module.scss';
// import LetSuspense from './components/LetSuspense/LetSuspense';
import MRSkeleton from './components/MRSkeleton/MRSkeleton';
import MealResults from './components/MealResults/MealResults';
import ErrorHandler from './components/Error/ErrorHandler';

class App extends Component {
  state = {
    query: '',
    payload: [],
    loading: false,
    error: null,
  };

  componentDidUpdate() {
    // console.log('Update LC');

    if (this.state.loading && this.state.payload.length === 0) {
      this.handleAsync();
    }
  }
  componentWillUnmount() {
    console.log('Unmount');
  }

  handleQuery = value => {
    this.setState({ query: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true, payload: [] });
  };

  closeErrorMessage = () => {
    this.setState({ error: null });
  };

  handleAsync = async () => {
    console.log(this.state);
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.state.query}`;
    const payload = [];
    let response;

    try {
      response = await axios.get(url);

      const meals = response.data.meals;
      if (response.status === 200 && !meals)
        throw new Error(`Sorry query '${this.state.query}' not found!`);

      const regex1 = /Ingredient\d+/i;
      const regex2 = /Measure\d+/i;
      const videoRegex = /\.*\?v=([a-zA-Z0-9_-]+)/;
      for (const meal of meals) {
        const {
          idMeal: id,
          strMeal: title,
          strInstructions: instructions,
          strMealThumb: imageURL,
          strYoutube,
          strCategory: category,
          strArea: area,
        } = meal;

        let videoURL = '';
        if (strYoutube) {
          if (videoRegex.test(strYoutube)) {
            const match = strYoutube.match(videoRegex)[1];
            // let apiURL = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${match}&key=${this.APIKEY}`;
            let apiURL = 'https://damiproxyapi.herokuapp.com/youtube/' + match;
            let response;

            response = await axios.get(apiURL);

            if (+response.data.totalResults > 0)
              videoURL = `https://www.youtube.com/embed/${match}`;
          }
        }

        const ingredients = [];
        const measure = [];
        for (const key in meal) {
          if (meal.hasOwnProperty(key)) {
            if (regex1.test(key) && meal[key]) {
              ingredients.push(meal[key]);
            }
            if (regex2.test(key) && meal[key]) {
              measure.push(meal[key]);
            }
          }
        }
        payload.push({
          id,
          title,
          instructions,
          imageURL,
          videoURL,
          category,
          area,
          ingredients,
          measure,
        });
      }
      this.setState({
        payload: payload,
        loading: false,
        query: '',
      });
    } catch (error) {
      this.setState({
        error: error.message,
        loading: false,
        payload: [],
        query: '',
      });
    }
  };

  render() {
    let renderData = null;

    if (this.state.loading && this.state.payload.length === 0) {
      renderData = <MRSkeleton />;
    }

    if (!this.state.loading && this.state.payload.length > 0) {
      renderData = <MealResults alldata={this.state.payload} />;
    }
    // console.log('rendering...');
    return (
      <div className={classes.App}>
        {this.state.error && (
          <ErrorHandler
            message={this.state.error}
            clearError={this.closeErrorMessage}
          />
        )}
        <h1 className={classes.header}>Meal Finder</h1>
        <SearchForm
          query={this.state.query}
          change={this.handleQuery}
          handleSubmit={this.handleSubmit}
        />
        {renderData}
      </div>
    );
  }
}

export default App;
