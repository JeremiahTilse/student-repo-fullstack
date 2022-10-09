/**
 * Exercise 04 - API *
 *
 * @format
 */

const url = 'https://restcountries.com/v3.1/all';

// Add your code here
const list = document.querySelector('#results');
const container = document.querySelector('.container');

// Message while fetching data
const div = document.createElement('div');
div.textContent = 'Please wait while data is fetched';
container.append(div);

// Create list item and add to ordered list
const addToList = (key, value) => {
  let element = document.createElement('li');

  // build string with country - population
  let itemString = `${key} - ${value.toLocaleString('en-US')}`;

  // Add string to list element
  element.textContent = itemString;
  list.append(element);
};

const addCountries = (data) => {
  // Put keys into array and sort using international collator
  const dataKeys = Object.keys(data);
  dataKeys.sort(new Intl.Collator('en-US').compare);

  // Add each country and population to list
  dataKeys.forEach((item) => {
    addToList(item, data[item]);
  });
};

// Fetch data and process
const getData = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Extract common names and populations
      const countryPopulations = {};
      data.forEach((item) => {
        const { name, population } = item;
        countryPopulations[name.common] = population;
      });

      // Add countries to list
      addCountries(countryPopulations);
      div.textContent = '';
    }).catch;
  (error) => {
    // Error logging and display
    console.log(error);
    div.textContent = 'An error occurred. Please try again.';
  };
};

getData(url);
