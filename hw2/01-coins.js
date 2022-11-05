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

  // Not a number ==> Error
  if (isNaN(input.toString())) return `Error: "${input}" is not a number`;

  // Negative ==> Error
  if (input < 0) {
    const negative = 0 - input;
    return `-$${negative.toString()} ==> Error: the number is negative`;
  }

  // Larger than 10 ==> Error
  if (input > 10)
    return `$${input.toString()} ==> Error: the number is to large`;

  // Not a proper dollar amount ==> Error
  if (input.toString().length > 4)
    return `$${input.toString()} ==> Error: the number is not a proper dollar amount`;
  // End base cases

  // Build the output
  let output = `$${input.toFixed(2)} ==> `;

  // Convert input to cents for manipulation
  let cents = input * 100;

  // Separate dollars
  const dollars = Math.floor(cents / 100);
  cents = cents % 100;
  if (dollars > 0) {
    output = `${output}${dollars.toString()} dollar`;
    if (dollars > 1) output = `${output}s`;
    if (cents > 0) output = `${output}, `;
  }

  // Separate quarters
  const quarters = Math.floor(cents / 25);
  cents = cents % 25;
  if (quarters > 0) {
    output = `${output}${quarters.toString()} quarter`;
    if (quarters > 1) output = `${output}s`;
    if (cents > 0) output = `${output}, `;
  }

  // Separate dimes
  const dimes = Math.floor(cents / 10);
  cents = cents % 10;
  if (dimes > 0) {
    output = `${output}${dimes.toString()} dime`;
    if (dimes > 1) output = `${output}s`;
    if (cents > 0) output = `${output}, `;
  }

  // Separate nickles
  const nickles = Math.floor(cents / 5);
  cents = cents % 5;
  if (nickles > 0) {
    output = `${output}${nickles.toString()} nickle`;
    if (nickles > 1) output = `${output}s`;
    if (cents > 0) output = `${output}, `;
  }

  // The rest in pennies
  if (cents > 1) output = `${output}${cents.toString()} pennies`;
  else if (cents > 0) output = `${output}${cents.toString()} penny`;

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

// Additional test cases
console.log(calculateChange(-9.74));
// -$9.74 ==> Error: the number is negative
console.log(calculateChange(4.344));
// $4.344 ==> Error: the number is not a proper dollar amount
console.log(calculateChange(1));
// $1.00 ==> 1 dollars
console.log(calculateChange(0));
// $0.00 ==> no coins

const notMoney = 'garbage';
console.log(calculateChange(notMoney));
// Error: "garbage" is not a number
