/** @format */

const express = require('express');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 5001;

// Add your code here
// Generate output
const generateOutput = (req, res, next) => {
  let path = req.baseUrl + req.path;

  let output = `Currently on route: ${path}\n\n`;
  if (req.session.routes === undefined) {
    req.session.routes = [];
    if (path !== '/favicon.ico') req.session.routes.push(path);
    output += `Welcome to http://localhost:${port}`;
  } else {
    let previously = `Previously visited:\n  `;
    previously += req.session.routes.join('\n  ');
    output += previously;
    if (path !== '/favicon.ico') req.session.routes.push(path);
  }
  req.generateOutput = output;
  next();
};

// Use the express-session module
app.use(
  session({
    store: new session.MemoryStore(),
    secret: 'shh, this is a secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000,
    },
  }),
);

// For middleware to work, this must be after session is created
app.use(generateOutput);

// Changed '/' to '*' to catch all paths
app.get('*', (req, res) => {
  // Add your code here
  res.status(200);
  res.set({ 'Content-Type': 'text/plain' });
  res.send(req.generateOutput);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
