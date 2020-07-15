import React, { Component } from 'react';
import axios from 'axios';
import MealDB from './mealIndexDB';
import SearchForm from './components/SearchForm/SearchForm';
import classes from './App.module.scss';

import MRSkeleton from './components/MRSkeleton/MRSkeleton';
import MealResults from './components/MealResults/MealResults';
import ErrorHandler from './components/Error/ErrorHandler';
import MealInfo from './components/MealInfo/MealInfo';
import MISkeleton from './components/MISkeleton/MealInfo';

class App extends Component {
  state = {
    query: '',
    payload: [],
    loading: false,
    error: null,
    currentMeal: null,
    randomMeal: false,
  };

  constructor() {
    super();
    this.mealdb = new MealDB('mealsdb__test', 1);
  }

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
    if (this.state.query.trim() === '') return;

    this.setState({
      loading: true,
      payload: [],
      currentMeal: null,
      randomMeal: false,
    });
  };

  closeErrorMessage = () => {
    this.setState({ error: null });
  };

  handleAsync = async () => {
    const url = !this.state.randomMeal
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.state.query}`
      : 'https://www.themealdb.com/api/json/v1/1/random.php';

    console.log(this.state.randomMeal, url);
    let payload = [];
    let response;

    try {
      // const dbmeal =
      //   !this.state.randomMeal && (await this.mealdb.getMeal(this.state.query));

      // if (false) {
      //   console.log(dbmeal);
      //   payload = dbmeal.payload;
      // } else {
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

      // add payloads to database
      // this.mealdb.addMeals(this.state.query, {
      //   name: this.state.query,
      //   payload,
      // });
      // }

      if (this.state.randomMeal) {
        this.setState({
          payload: payload,
          loading: false,
          currentMeal: payload[0],
        });
      } else {
        console.log(payload);
        this.setState({
          payload: payload,
          loading: false,
          query: '',
        });
      }
    } catch (error) {
      this.setState({
        error: error.message,
        loading: false,
        payload: [],
        query: '',
        currentMeal: null,
        randomMeal: false,
      });
      console.log(error);
    }
  };

  randomMealHandler = event => {
    event.preventDefault();
    this.setState({
      payload: [],
      randomMeal: true,
      loading: true,
      currentMeal: null,
    });
  };

  handleMealClick = event => {
    if (event.target.dataset.id) {
      const id = event.target.dataset.id;
      const object = this.state.payload.find(data => data.id === id);
      if (object) {
        this.setState({ currentMeal: object });
      } else {
        this.setState({ error: 'Invalid selection' });
      }
    }
  };

  goBack = event => {
    // event.preventDefault();

    this.setState({ currentMeal: null });
  };

  render() {
    let renderData = null;

    if (this.state.loading && this.state.payload.length === 0) {
      renderData = this.state.randomMeal ? <MISkeleton /> : <MRSkeleton />;
    }

    if (!this.state.loading && this.state.payload.length > 0) {
      renderData = this.state.currentMeal ? (
        <MealInfo
          data={this.state.currentMeal}
          randomMeal={this.state.randomMeal}
          back={this.goBack}
        />
      ) : (
        <MealResults
          alldata={this.state.payload}
          click={this.handleMealClick}
        />
      );
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
          handleRandom={this.randomMealHandler}
        />
        {renderData}
      </div>
    );
  }
}

export default App;
