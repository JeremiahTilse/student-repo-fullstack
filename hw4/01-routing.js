/** @format */

const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const routes = [
  'welcome',
  'redirect',
  'redirected',
  'cache',
  'cookie',
  'other',
];

let getRoutes = () => {
  let result = '';

  routes.forEach(
    (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`),
  );

  return result;
};

let routeResults = getRoutes();

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(`<h1>Exercise 04</h1>`);
  res.write(`<ul> ${routeResults} </ul>`);
  res.end();
});

// Add your code here
// Welcome
app.get('/welcome', (req, res) => {
  res.status(200);
  res.set({ 'Content-Type': 'text/html' });
  res.send(`
    <h1>Exercise 04</h1>
    <ul> ${routeResults} </ul>
    <h2>Welcome</h2>
    <p>This is my Welcome page.  Not much to see here</p>
  `);
});

// Redirect and Redirected
app.get('/redirect', (req, res) => {
  res.redirect('/redirected');
});

app.get('/redirected', (req, res) => {
  res.status(200);
  res.set({ 'Content-Type': 'text/html' });
  res.send(`
    <h1>Exercise 04</h1>
    <ul> ${routeResults} </ul>
    <h2>Redirected</h2>
    <p>You were either redirected to this page, or came here using a direct link</p>
  `);
});

// Cache
app.get('/cache', (req, res) => {
  res.status(200);
  res.set({
    'Content-Type': 'text/html',
    'Cache-control': 'max-age=86400',
  });
  res.send(`
    <h1>Exercise 04</h1>
    <ul> ${routeResults} </ul>
    <h2>Cache</h2>
    <p>This resources was cached</p>
  `);
});

// Cookie
app.get('/cookie', (req, res) => {
  res.status(200);
  res.set({
    'Content-Type': 'text/plain',
    'Set-Cookie': 'hello=world',
  });
  res.send(`cookies… yummm`);
});

// 404
app.use((req, res) => {
  res.status(404).send(`
    <h1>Exercise 04</h1>
    <ul> ${routeResults} </ul>
    <h2>404</h2>
    <p>Page not found</p>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
