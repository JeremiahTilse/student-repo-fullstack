/**
 * Exercise 03 - Form *
 *
 * @format
 */

// Add your code here
const form = document.querySelector('form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  const data = {};
  const all = form.querySelectorAll('input');
  const feedback = form.querySelector('textarea');

  // Add input values to data object
  all.forEach((field) => {
    if (field.type !== 'submit' && field.type !== 'reset') {
      if (field.type === 'checkbox') {
        if (field.checked) {
          data[field.name] = field.value;
        }
      } else {
        if (field.value) data[field.name] = field.value;
      }
    }
  });

  // Add textarea value to data object
  if (feedback.value) data[feedback.name] = feedback.value;

  const none = 'no submission';

  // Process data for logging
  if (JSON.stringify(data) === '{}') {
    console.warn('You must enter some data to submit this form');
  } else {
    console.groupCollapsed('========= Form Submission =========');

    data.name ? console.log('Name:', data.name) : console.log('Name:', none);

    data.email
      ? console.log('Email:', data.email)
      : console.log('Email:', none);

    data.message
      ? console.log('Feedback:', data.message)
      : console.log('Feedback:', 'No feedback was submitted');

    data.signUp
      ? console.log('Newsletter:', 'Yes, I would like to join the newsletter.')
      : console.log('Newsletter:', 'No, thank you.');

    console.groupEnd();
  }

  event.preventDefault();
}
