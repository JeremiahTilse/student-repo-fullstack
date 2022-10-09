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

// Add an event listener on the target element
reverse.addEventListener('click', reverseInput);

// Callback function to handle event
function reverseInput() {
  // If string is 8 characters, reverse
  // Assumes only numbers in value, since input type is 'number'
  if (input.value.toString().length === 8) {
    // Set color and margin for output
    output.setAttribute('class', 'mt-3 text-success');

    // Store and reverse number
    const original = input.value.toString();
    let reversed = original.split('');
    reversed = reversed.reverse();
    reversed = reversed.join('');

    // Output original and reverse
    output.textContent = original + ' --> ' + reversed;
    console.log('Input: ', input.value, ' - Reversed: ', reversed);
  } else {
    // Output error
    output.setAttribute('class', 'mt-3 text-danger');
    output.textContent = 'Error Please input an 8-digit number';
    console.error('Error: Invalid input');
  }
}
