/** @format */

const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5001;

// Use Pug as the templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// REST Countries URL
const url = 'https://restcountries.com/v3.1/all';

const countryData = [];

// Add your code here
const getData = (url) => {
  axios
    .get(url)
    .then((response) => {
      response.data.forEach((item) => {
        countryData.push(item);
      });
    })
    .catch((error) => {
      // Error logging and display
      console.log(error);
      div.textContent = 'An error occurred. Please try again.';
    });
};

getData(url);

app.get('/', (req, res) => {
  // render pug template for the index.html file

  res.render('index', {
    heading: 'Countries of the World',
    main: 'Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world',
  });
});

app.get('/capitals', (req, res) => {
  // map the output array to create an array with country names and capitals
  // check for empty data in the output array
  let countries = [];

  countryData.forEach((item) => {
    let capitals = item.capital;
    if (capitals === undefined) capitals = `no data`;
    countries.push(`${item.name.common} - ${capitals}`);
  });
  countries.sort(new Intl.Collator('en-US').compare);

  res.render('page', {
    heading: 'Countries and Capitals',
    results: countries,
  });
});

app.get('/populous', (req, res) => {
  // filter the output array for the countries with population of 50 million or more
  // sort the resulting array to show the results in order of population
  // map the resulting array into a new array with the country name and formatted population

  let populous = [];

  // Sort data by population, greatest to least
  countryData.sort((a, b) => {
    return b.population - a.population;
  });

  // Push onto array, if population is greater than 50 million
  countryData.forEach((item) => {
    if (item.population >= 50000000) {
      populous.push(
        `${item.name.common} - ${item.population.toLocaleString('en-US')}`,
      );
    }
  });

  res.render('page', {
    heading: 'Most Populous Countries',
    results: populous,
  });
});

app.get('/regions', (req, res) => {
  // reduce the output array in a resulting object that will feature the numbers of countries in each region
  // disregard empty data from the output array
  const regionCounter = {};
  let regions = [];

  countryData.forEach((item) => {
    if (regionCounter[item.region] === undefined)
      regionCounter[item.region] = 0;
    regionCounter[item.region] += 1;
  });

  Object.keys(regionCounter).forEach((region) => {
    regions.push(`${region} - ${regionCounter[region]}`);
  });

  regions.sort(new Intl.Collator('en-US').compare);

  res.render('page', {
    heading: 'Regions of the World',
    results: regions,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
