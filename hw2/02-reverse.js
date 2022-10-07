/**
 * Exercise 02 - Reverse *
 *
 * @format
 */

// Add your code here

let input = document.querySelector('#input');
let reverse = document.querySelector('#reverse');
let main = document.querySelector('main');

// Create output element
let output = document.createElement('div');
output.setAttribute('class', 'output');

main.append(output);

// add an event listener on the target element
reverse.addEventListener('click', reverseInput);

// callback function to handle event
function reverseInput() {
  if (input.value.toString().length === 8) {
    output.setAttribute('class', 'mt-3 text-success');
    const original = input.value.toString();
    let reversed = original.split('');
    reversed = reversed.reverse();
    reversed = reversed.join('');

    output.textContent = original + ' --> ' + reversed;
    console.log('Input: ', input.value);
    console.log('Reversed: ', reversed);
  } else {
    output.setAttribute('class', 'mt-3 text-danger');
    output.textContent = 'Error Please input an 8-digit number';
    console.error('Error: Invalid input');
  }
}
