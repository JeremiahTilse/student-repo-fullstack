/** @format */

const http = require('http');
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// http://localhost:5001/check-cookies should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const server = http.createServer((req, res) => {
  const routes = [
    'welcome',
    'redirect',
    'redirected',
    'cache',
    'cookie',
    'check-cookies',
    'other',
  ];

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
    res.write(`<h1>Exercise 01</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.end();
  }

  // Add your code here
  // Welcome page
  else if (req.url === '/welcome') {
    let routeResults = getRoutes();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 01</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.write(`<h2>Welcome</h2>`);
    res.write(`<p>This is my Welcome page.  Not much to see here</p>`);
    res.end();
  }

  // Redirect
  else if (req.url === '/redirect') {
    res.statusCode = 302;
    res.setHeader('Location', '/redirected');
    res.end();
  }

  // Redirected
  else if (req.url === '/redirected') {
    let routeResults = getRoutes();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 01</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.write(`<h2>Redirected</h2>`);
    res.write(
      `<p>You were either redirected to this page, or came here using a direct link</p>`,
    );
    res.end();
  }

  // Cache
  else if (req.url === '/cache') {
    let routeResults = getRoutes();
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Cache-Control': 'max-age=86400',
    });
    res.write(`<h1>Exercise 01</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.write(`<h2>Cache</h2>`);
    res.write(`<p>this resource was cached</p>`);
    res.end();
  }

  // Cookie
  else if (req.url === '/cookie') {
    res.writeHead(200, {
      'Set-Cookie': 'hello=world',
    });
    res.write(`cookies... yummm`);
    res.end();
  }

  // Check-Cookies
  else if (req.url === '/check-cookies') {
    if (
      req.headers.cookie &&
      req.headers.cookie
        .split(';')
        .some((item) => item.trim().startsWith('hello='))
    ) {
      res.write(`yes`);
    } else {
      res.write(`no`);
    }
    res.end();
  }

  // Other
  else {
    let routeResults = getRoutes();
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 01</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.write(`<h2>404: Page not found</h2>`);
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
