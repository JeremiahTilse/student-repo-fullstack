/**
 * Exercise 04 - API *
 *
 * @format
 */

const url = 'https://restcountries.com/v3.1/all';

// Add your code here
const list = document.querySelector('#results');
const container = document.querySelector('.container');
let div = document.createElement('div');
div.textContent = 'Please wait while data is fetched';
container.append(div);

const addToList = (key, value) => {
  let element = document.createElement('li');

  let itemString = key + ' - ' + value.toLocaleString('en-US');

  element.textContent = itemString;
  list.append(element);
  div.textContent = '';
};

const addCountries = (data) => {
  const dataKeys = Object.keys(data);
  dataKeys.sort(new Intl.Collator('en-US').compare);
  dataKeys.forEach((item) => {
    addToList(item, data[item]);
  });
};

const getData = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const countryPopulations = {};
      data.forEach((item) => {
        const { name, population } = item;
        countryPopulations[name.common] = population;
      });
      addCountries(countryPopulations);
    }).catch;
  (error) => {
    console.log(error);
    div.textContent = 'An error occurred. Please try again.';
  };
};

getData(url);
