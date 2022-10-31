/** @format */

const http = require('http');
const queryString = require('node:querystring');
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

const routes = ['form', 'submit'];

const getRoutes = () => {
  let result = '';

  routes.forEach(
    (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`),
  );

  return result;
};

const routeResults = getRoutes();

/* The Form
 * Yes, I could have put this in a different file, but I wanted to see if I could
 * make this exercise work with minimal dependencies and one file. Also, I wanted to
 * put the heading and menu on every page.
 */
const formHTML = `<html><head><title>Post Example</title></head><body>
  <h1>Exercise 03</h1>
  <ul> ${routeResults} </ul>
  <h2>Contact Form</h2>
  <form method='post' action='/submit'>
  <div style='margin:4px'>
  <label style='display:block' for="userName">Name *</label>
  <input
    style='display:block'
    type="text"
    name="userName"
    id="userName"
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
    <label style='display:block' for="message">Comment (optional):</label>
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
</form></body></html>`;

// Serve up the site
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 03</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.write(`<p>For proper use, click on 'form' in menu.</p>`);
    res.write(
      `<p>The 'submit' option is only available to demonstrate handling of improper navigation.</p>`,
    );
    res.end();
  }

  // form route --> /form
  else if (req.method === 'GET' && req.url === '/form') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(formHTML);
  }

  // submit (POST) route --> /submit
  else if (req.method === 'POST' && req.url === '/submit') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const userdata = queryString.parse(body);
      const { userName, email, message, signUp } = userdata;

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`<h1>Exercise 03</h1>`);
      res.write(`<ul> ${routeResults} </ul>`);
      res.write(`<h2>Submitted Information</h2>`);
      res.write(`<p>Name: ${userName}</p>`);
      res.write(`<p>Email: ${email}</p>`);
      if (message) {
        res.write(`<p>Comments: ${message}</p>`);
      } else {
        res.write(`<p>Comments: n/a</p>`);
      }
      if (signUp) {
        res.write(`<p>Newsletter: Yes, sign me up for the newsletter.</p>`);
      } else {
        res.write(`<p>Newsletter: No, thank you.</p>`);
      }
      res.end();
    });
  }

  // submit (GET) route --> /submit (message for bypassing form)
  else if (req.method === 'GET' && req.url === '/submit') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 03</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.write(`<p>Form was bypassed.  Please go back and fill out form</p>`);
    res.end();
  }

  // Other (404)
  else {
    let routeResults = getRoutes();
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 03</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.write(`<h2>404: Page not found</h2>`);
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
