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

const addCountryToList = (item) => {
  let element = document.createElement('li');

  const { name, population } = item;

  let itemString = name.common + ' - ' + population.toLocaleString('en-US');

  element.textContent = itemString;
  list.append(element);
  div.textContent = '';
};

const getData = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.sort();
      data.forEach((item) => {
        addCountryToList(item);
      });
    }).catch;
  (error) => {
    console.log(error);
    div.textContent = 'An error occurred. Please try again.';
  };
};

getData(url);
