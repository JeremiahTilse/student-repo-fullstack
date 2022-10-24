/** @format */

const http = require('http');
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

const data = {};
const handleSubmit = (event) => {
  let all = form.querySelectorAll('input');
  let message = form.querySelector('textarea');

  for (let field of all) {
    if (field.type != 'submit' && field.type != 'reset') {
      if (field.value) data[field.name] = field.value;
    }
  }
  if (message.value) data[message.name] = message.value;

  const none = 'no submission';

  if (JSON.stringify(data) === '{}')
    console.warn('You must enter some data to submit this form');
  else {
    console.groupCollapsed('========= Form Submission =========');

    data.name ? console.log('Name:', data.name) : console.log('Name:', none);

    data.email
      ? console.log('Email:', data.email)
      : console.log('Email:', none);

    data.message
      ? console.log('Message:', data.message)
      : console.log('Message:', none);

    console.groupEnd();
  }
  event.preventDefault();
};

const server = http.createServer((req, res) => {
  const routes = ['form', 'submit'];

  let getRoutes = () => {
    let result = '';

    routes.forEach(
      (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`),
    );

    return result;
  };

  if (req.url === '/') {
    let routeResults = getRoutes();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 03</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.end();
  } else if (req.url === '/form') {
    let routeResults = getRoutes();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 03</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.write(`
      <form>
        <h1>Contact Form</h1>
        <div style='margin:4px'>
          <label style='display:block' for="name">Name *</label>
          <input
            style='display:block'
            type="text"
            name="name"
            id="name"
            required
          />
        </div>
        <div style='margin:4px'>
          <label style='display:block' for="email">Email *</label>
          <input
          style='display:block'
            type="email"
            name="email"
            id="email"
            required
          />
        </div>
        <div style='margin:4px'>
          <label style='display:block' for="message">Submit your message:</label>
          <textarea style='display:block' name="message" id="message"></textarea>
        </div>
        <div style='margin:4px'>
          <input
            type="checkbox"
            name="signUp"
            id="signUp"
          />
          <label for="signUp">Sign up for the newsletter</label>
        </div>
        <div style='margin:4px'>
          <input type="submit" value="Submit" />
          <input type="reset" value="Reset" />
        </div>
      </form>
    `);

    res.end();
  } else if (req.url === '/submit') {
    let routeResults = getRoutes();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 03</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.write(`<h2>Submitted</h2>`);
    res.end();
  }

  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
