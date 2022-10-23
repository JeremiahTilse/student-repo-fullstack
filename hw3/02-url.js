/** @format */

const http = require('http');
const port = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  const routes = [
    '/attributes?hello=world&lorem=ipsum',
    '/items?first=1&second=2&third=3&fourth=4',
    '/characters?spongebob=squarepants&patrick=star&sandy=cheeks',
  ];

  // use the URL interface to work with URLs
  // source: https://developer.mozilla.org/en-US/docs/Web/API/URL
  let url = new URL(req.url, `http://${req.headers.host}`);

  let getRoutes = () => {
    let result = '';

    routes.forEach(
      (elem) => (result += `<li><a href="${elem}">${elem}</a></li>`),
    );

    return result;
  };

  if (req.url === '/') {
    let routeResults = getRoutes();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 02</h1>`);

    res.write(`<ul> ${routeResults} </ul>`);
  }

  // Add your code here
  else {
    let routeResults = getRoutes();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 02</h1>`);

    res.write(`<ul> ${routeResults} </ul>`);

    // Get and parse path for heading
    let pathname = url.pathname;
    pathname = pathname.substring(1);
    pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
    res.write(`<h2> ${pathname} </h2>`);

    // Get parameters and create table
    let params = url.searchParams;
    res.write(`<table style='border: 1px solid black'>`);
    for (const [key, value] of params) {
      res.write(
        `<tr><td style='border: 1px solid black'>${key}</td><td style='border: 1px solid black'>${value}</td></tr>`,
      );
    }
    res.write(`</table>`);
  }
  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
