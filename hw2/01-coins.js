/**
 * Exercise 01 - Coins *
 *
 * @format
 */

const calculateChange = (input) => {
  // Add your code here

  // Base cases
  // Zero
  if (input === 0) return '$0.00 ==> no coins';

  // Not a number ==> ERROR
  if (isNaN(input.toString())) return 'ERROR: input is not a number';

  // Negative ==> ERROR
  if (input < 0) {
    let negative = 0 - input;
    return '-$' + negative.toString() + ' ==> ERROR: the number is negative';
  }

  // Larger than 10 ==> ERROR
  if (input > 10)
    return '$' + input.toString() + ' ==> ERROR: the number is to large';

  // Not a proper dollar amount ==> ERROR
  if (input.toString().length > 4)
    return (
      '$' +
      input.toString() +
      ' ==> ERROR: the number is not a proper dollar amount'
    );

  // Initialize variable (in cents) for manipulation
  let num = input * 100;

  // dollars
  let dollars = Math.floor(num / 100);
  num = num % 100;

  // quarters
  let quarters = Math.floor(num / 25);
  num = num % 25;

  // dimes
  let dimes = Math.floor(num / 10);
  num = num % 10;

  // nickles
  let nickles = Math.floor(num / 5);
  num = num % 5;

  // pennies
  let pennies = num;

  // Build the output
  let output = '$' + input.toFixed(2) + ' ==> ';
  if (dollars > 0) {
    output = output + dollars.toString() + ' dollar';
    if (dollars > 1) output = output + 's';
    if (quarters > 0 || dimes > 0 || nickles > 0 || pennies > 0)
      output = output + ', ';
  }

  if (quarters > 0) {
    output = output + quarters.toString() + ' quarter';
    if (quarters > 1) output = output + 's';
    if (dimes > 0 || nickles > 0 || pennies > 0) output = output + ', ';
  }

  if (dimes > 0) {
    output = output + dimes.toString() + ' dime';
    if (dimes > 1) output = output + 's';
    if (nickles > 0 || pennies > 0) output = output + ', ';
  }

  if (nickles > 0) {
    output = output + nickles.toString() + ' nickle';
    if (nickles > 1) output = output + 's';
    if (pennies > 0) output = output + ', ';
  }

  if (pennies > 1) output = output + pennies.toString() + ' pennies';
  else if (pennies > 0) output = output + pennies.toString() + ' penny';

  return output;
};

// Sample Test Cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(9.74));
// $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(15.11));
// $15.11 ==> Error: the number is too large
console.log(calculateChange(4.344));
// $4.344 ==> Error: the number is not a proper dollar amount
console.log(calculateChange(1));
// $1.00 ==> 1 dollars
console.log(calculateChange(0));
// $0.00 ==> no coins
